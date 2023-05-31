const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Profile = require("../models/Profile");

module.exports = {
  getMakeProject: async (req, res) => {
    console.log(req.user);
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const projects = await Project.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("makeProject.ejs", { projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getProject: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const project = await Project.findById(req.params.id).populate("user");
      const submissions = await Submission.find({
        project: req.params.id,
      }).populate("user");
      res.render("project.ejs", {
        project: project,
        user: req.user,
        submissions: submissions,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getMyProject: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const project = await Project.findById(req.params.id);
      const submission = await Submission.find({ project: req.params.id })
        .sort({ createdAt: "desc" })
        .populate("user")
        .lean();
      res.render("myProject.ejs", {
        project: project,
        user: req.user,
        submission: submission,
      });
      console.log(submission);
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      let imgResult;
      let fileResult;
      console.log(req.user);
      if (req.files["imgUpload"] && req.files["imgUpload"][0]) {
        // Upload image to cloudinary
        imgResult = await cloudinary.uploader.upload(
          req.files["imgUpload"][0].path
        );
      }
      if (req.files["fileUpload"] && req.files["fileUpload"][0]) {
        //// Upload file to cloudinary
        fileResult = await cloudinary.uploader.upload(
          req.files["fileUpload"][0].path,
          {
            public_id: `${Date.now()}-${req.files.fileUpload[0].originalname}`,
            resource_type: "raw",
            // raw_convert: 'aspose', // Use aspose to convert files to pdf. Only 50 free per month.
          }
        );
      }
      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content
      await Project.create({
        title: req.body.title,
        file: fileResult ? fileResult.secure_url : null,
        fileCloudinaryId: fileResult ? fileResult.public_id : null,
        image: imgResult ? imgResult.secure_url : null,
        cloudinaryId: imgResult ? imgResult.public_id : null,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  },
  likeProject: async (req, res) => {
    try {
      await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/project/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteProject: async (req, res) => {
    try {
      // Find post by id
      let project = await Project.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(project.cloudinaryId);
      await cloudinary.uploader.destroy(project.fileCloudinaryId, {
        resource_type: "raw",
      });
      // Delete post from db
      await Project.remove({ _id: req.params.id });
      console.log("Deleted Project");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      console.log("Did Not Delete Project");
      res.redirect(`/profile/${req.user.id}`);
    }
  },
};

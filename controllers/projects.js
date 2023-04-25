const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

module.exports = {
  getProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const projects = await Project.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMyProject: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const projects = await Project.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("myProject.ejs", { projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { projects: projects });
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
      const project = await Project.findById(req.params.id);
      res.render("project.ejs", { project: project, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  createProject: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      //// Upload file to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${Date.now()}-${req.file.originalname}`,
        resource_type: 'raw',
        raw_convert: 'aspose',
      });
      console.log(result)
      console.log(req)

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Project.create({
        title: req.body.title,
        // file: fileUpload.secure_url,  // attempting to upload file
        // fileCloudinaryId: fileUpload.public_id, 
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
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
      // Delete post from db
      await Project.remove({ _id: req.params.id });
      console.log("Deleted Project");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

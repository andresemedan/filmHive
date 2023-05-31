const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Profile = require("../models/Profile");

module.exports = {
    getProfile: async (req, res) => {
      console.log(req.user);
      try {
        //Since we have a session each request (req) contains the logged-in users info: req.user
        //console.log(req.user) to see everything
        //Grabbing just the posts of the logged-in user
        const projects = await Project.find({ user: req.user.id }).populate(
          "user"
        );
        const userProjects = await Project.find({ user: req.params.id }).populate(
          "user"
        );
        const userProfile = await User.findById(req.params.id);
        const profile = await Profile.find({ user: req.params.id })
          .populate("user")
          .sort({ createdAt: "desc" })
          .lean();
        const submissions = await Submission.find({
            user: req.params.id,
          }).populate("user").populate("project").sort({ createdAt: "desc" }).lean();
  
        //Sending post data from mongodb and user data to ejs template
        res.render("profile.ejs", {
          projects: projects,
          user: req.user,
          viewedUserId: req.params.id,
          userProfile: userProfile,
          userProjects: userProjects,
          profile: profile,
          submissions: submissions,
        });
      } catch (err) {
        console.log(err);
      }
    },
    uploadProfilePic: async (req, res) => {
      try {
        console.log(req.file);
        let result = await cloudinary.uploader.upload(req.file.path);
  
        //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content
        await Profile.create({
          profilePic: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user.id,
        });
        console.log("Profile picture has been added!");
        res.redirect(`/profile/${req.user.id}`);
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
    },
}
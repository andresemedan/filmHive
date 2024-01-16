const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Profile = require("../models/Profile");

module.exports = {  
    getFeed: async (req, res) => {
        try {
          const projects = await Project.find().sort({ createdAt: "desc" }).lean().populate('user');
          const submissions = await Submission.find().populate("user");
          console.log(submissions)
          res.render("feed.ejs", { projects: projects, user: req.user, submissions: submissions});
        } catch (err) {
          console.log(err);
        }
      },
}
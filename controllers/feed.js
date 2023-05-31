const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

module.exports = {  
    getFeed: async (req, res) => {
        try {
          const projects = await Project.find().sort({ createdAt: "desc" }).lean();
          res.render("feed.ejs", { projects: projects, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
}
const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Profile = require("../models/Profile");
const ProfileMedia = require("../models/ProfileMedia")
const Bio = require("../models/Bio");

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

        const media = await ProfileMedia.find({user: req.params.id}).populate('user')

        // This bio varable needs to find the Bio based on the User using the params not the req.user.
        // This is because the profile we are on has the params of the user we are trying to access the bio of
        const bio = await Bio.find({user: req.params.id})
          .sort({ createdAt: "desc" })
          .lean();
  
        //Sending post data from mongodb and user data to ejs template
        res.render("profile.ejs", {
          projects: projects,
          user: req.user,
          viewedUserId: req.params.id,
          userProfile: userProfile,
          userProjects: userProjects,
          profile: profile,
          submissions: submissions,
          media: media,
          bio: bio,
        });
      } catch (err) {
        console.log(err);
      }
    },
    getHomeProfile: async (req, res) => {
      console.log(req.user);
      try {
        //Since we have a session each request (req) contains the logged-in users info: req.user
        //console.log(req.user) to see everything
        //Grabbing just the posts of the logged-in user
        const projects = await Project.find({user: req.user.id}).populate("user");

        const bio = await Bio.find({user: req.user.id})
        .sort({ createdAt: "desc" })
        .lean();

        const media = await ProfileMedia.find({user: req.user.id})

        const profile = await Profile.find({user: req.user.id})
          .populate("user")
          .sort({ createdAt: "desc" })
          .lean();
        const submissions = await Submission.find({user: req.user.id}).populate("user").populate("project").sort({ createdAt: "desc" }).lean();
  
        //Sending post data from mongodb and user data to ejs template
        res.render("homeProfile.ejs", {
          projects: projects,
          bio: bio, 
          media: media,
          user: req.user,
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
        res.redirect("/profile/homeProfile");
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
    },
    createBio: async (req, res) => {
      console.log("here's the controller log", req.body.bio)
      try {
        await Bio.create({
          bio: req.body.bio,
          user: req.user.id,
        });
        console.log("Bio has been added!");
        res.redirect("/profile/homeProfile");
      } catch (err) {
        console.log(err);
      }
    },  
    addProfileMedia: async (req, res) => {
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
        await ProfileMedia.create({
          title: req.body.title,
          file: fileResult ? fileResult.secure_url : null,
          fileCloudinaryId: fileResult ? fileResult.public_id : null,
          image: imgResult ? imgResult.secure_url : null,
          cloudinaryId: imgResult ? imgResult.public_id : null,
          user: req.user.id,
        });
        console.log("Post has been added!");
        res.redirect('/profile/homeProfile');
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
    },
}
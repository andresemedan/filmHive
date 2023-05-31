const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Profile = require("../models/Profile");

module.exports = {
    submitToProject: async (req, res) => {
        try {
          await Submission.create({
            role: req.body.selectedRole,
            status: false,
            project: req.params.id,
            user: req.user.id,
          });
          console.log("Submission completed!");
          res.redirect("/project/" + req.params.id);
        } catch (err) {
          console.log(err);
        }
      },
      acceptRole: async (req, res)=>{
        try{
           let submission = await Submission.findOneAndUpdate({_id: req.params.id},{
                status: true
            })
            console.log("HERE" + submission.project)
            console.log('Role Accepted')
            res.redirect(`/project/myProject/${submission.project}`);
        }catch(err){
            console.log(err)
        }
      },
      rejectRole: async (req, res) => {
        try{
          let submission = await Submission.findOneAndUpdate({_id: req.params.id},{
               status: null
           })
           console.log("HERE" + submission.project)
           console.log('Role Accepted')
           res.redirect(`/project/myProject/${submission.project}`);
       }catch(err){
           console.log(err)
       }
     },
}
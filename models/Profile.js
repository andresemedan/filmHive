const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Profile", ProfileSchema);

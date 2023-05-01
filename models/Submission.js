const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
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

module.exports = mongoose.model("Submission", SubmitSchema);
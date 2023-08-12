const mongoose = require("mongoose");

const BioSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Bio", BioSchema);
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const feedController = require("../controllers/feed")
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const profileController = require("../controllers/profile");
const { ensureAuth } = require("../middleware/auth");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/profile/homeProfile", ensureAuth, profileController.getHomeProfile);
router.get("/profile/:id", ensureAuth, profileController.getProfile);
router.post("/profilePic", upload.single("profilePicUpload"), profileController.uploadProfilePic)

//Add Media
router.post("/profile/addProfileMedia", upload.fields([{ name: 'imgUpload', maxCount: 1 }, { name: 'fileUpload', maxCount: 1 }]), profileController.addProfileMedia);

//Add Bio
// router.post("/createBio", (req, res) => {
//     console.log("recieved form subsmission", req.body)
//     profileController.createBio(req,res)});
// If I want to keep the console.log, I have to invoice the createBio() method.
// Othersiwise just keep it as 
router.post("/createBio", profileController.createBio);

//Enable us to get project feed
router.get("/feed", ensureAuth, feedController.getFeed);

router.get("/makeProject", ensureAuth, projectsController.getMakeProject)

//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;

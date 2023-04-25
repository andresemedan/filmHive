const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, projectsController.getProject);


// router.post("/createProject", upload.single('file'), projectsController.createProject);
//Enables user to create post w/ cloudinary for media uploads
router.post("/createProject", upload.fields([{ name: 'imgUpload', maxCount: 1 }, { name: 'fileUpload', maxCount: 1 }]), projectsController.createProject);

//Enable us to get project feed
router.get("/feed", ensureAuth, projectsController.getFeed);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likeProject/:id", projectsController.likeProject);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deleteProject/:id", projectsController.deleteProject);

module.exports = router;

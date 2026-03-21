const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router();

/* POST /api/posts/ [Protected]
 - req.body = { caption, imageFile } */
postRouter.post("/", upload.single("Image"), postController.createPostController);

module.exports = postRouter;
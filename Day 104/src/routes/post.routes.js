const express = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router();

/* POST /api/posts/ [Protected]
 - req.body = { caption, imageFile } */
postRouter.post("/", upload.single("Image"), postController.createPostController);

/* GET /api/posts/ [Protected]*/
postRouter.get("/", postController.getPostController);

/* GET /api/posts/details/:postId 
 - Return an detail about specific post with the id, Also check whether the post belongs to the user that the request come from */
postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;
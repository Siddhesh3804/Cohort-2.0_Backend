const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware");


/* POST /api/posts/ [Protected]
 - req.body = { caption, imageFile } */
postRouter.post("/", upload.single("Image"), identifyUser, postController.createPostController);


/* GET /api/posts/ [Protected]*/
postRouter.get("/", identifyUser, postController.getPostController);


/* GET /api/posts/details/:postId 
 - Return an detail about specific post with the id, Also check whether the post belongs to the user that the request come from */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

module.exports = postRouter;
const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

/*
 * @route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private 
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

module.exports = userRouter;
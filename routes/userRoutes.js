const express = require("express"); // to use express in project
const userRouter = express.Router();
const { protectRoute } = require("../helper/helper");
const { getUser } = require("../controller/userController");

userRouter.get("/users", protectRoute, getUser);
module.exports = userRouter;

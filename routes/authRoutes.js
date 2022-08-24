const express = require("express"); // to use express in project
const authRouter = express.Router(); 
const {
  loginController,
  signupController,
  forgetPasswordController,
  resetPasswordController,
} = require("../controller/authController");

//app.post("/api/v1/auth.login",loginController); both line above and this have same impact
authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
authRouter.patch("/forgetPassword", forgetPasswordController);
authRouter.patch("/resetPassword", resetPasswordController);

module.exports = authRouter;

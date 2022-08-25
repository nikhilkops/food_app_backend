const express = require("express"); // to use express in project
const planRouter = express.Router();
const { protectRoute } = require("../helper/helper");
const {
  getAllPlansController,
  createPlanController,
  updateUserController,
  deleteUserController,
  getPlansController,
} = require("../controller/planControler");

planRouter
  .route("/")
  .get(getAllPlansController)
  .post(protectRoute, createPlanController);

//fir user
planRouter
  .route("/:id")
  .patch(protectRoute, updateUserController)
  .delete(protectRoute, deleteUserController)
  .get(protectRoute, getPlansController);

module.exports = planRouter;

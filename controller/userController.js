const { UserModel } = require("../model/userModel");
const { planModel } = require("../model/planModel");

async function getUser(req, res) {
  try {
    let user = await UserModel.find();
    //json data
    res.json(user);
  } catch (err) {
    res.end(err.message);
  }
}

module.exports = {
  getUser,
};

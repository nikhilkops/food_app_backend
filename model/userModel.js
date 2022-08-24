const mongoose = require("mongoose"); // to import mongoose library
const secret = require("../secret");
let dbLink = secret.DB_LINK;
//link to k connect db to application
//it gives us promise of connecting the database either it connects it or not

mongoose
  .connect(dbLink)
  .then(function () {
    console.log("Connected");
  })
  .catch(function (err) {
    console.log("Failed to connect Due to ", err);
  });

//name pasword phoneno pic address email
let userScheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  phoneNo: { type: String, minLength: 10, maxLength: 10 },
  pic: {
    type: String,
    default:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
  address: { type: String },
  otp: { type: String },
  otpTime: { type: Date },
}); // to define the entry
//scheme is j set of rules
const UserModel = mongoose.model("FoodUser", userScheme);
// it will create a collection names FoodUser with rules of userScheme
module.exports = { UserModel };

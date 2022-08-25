// const { UserModel } = require("../userModel");
const { UserModel } = require("../model/userModel");
const sha = require("sha256");
const jwt = require("jsonwebtoken");
const secret = process.env ||require("../secret") ;

const { getOTP, setExpiry, mailSender } = require("../helper/helper");

async function loginController(req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    //if email and password both exist
    if (email && password) {
      let user = await UserModel.findOne({ email: email });
      //if user exist
      if (user) {
        //if user password matches
        // console.log(secret);
        let encryptedPassword = sha.x2(password);
        if (user.password == encryptedPassword) {
          // making JWT TOKEN
          const token = jwt.sign({ id: user["_id"] }, secret.JWT, {
            expiresIn: "2h",
          });

          user.password = undefined;
          user.confirmPassword = undefined;
          data.password = undefined;

          console.log(user);
          res.cookie("JWT", token); //to send cookie to the client

          let newO = user;
          // console.log(newO);

          res.status(200).json(newO);
        }
        //if user password doest matches
        else {
          res.status(401).json({ result: "Wrong Password......." }); // unauthorize
        }
      }

      //if user dont exist
      else {
        res.status(404).json({ result: "user not found !" }); // not found
      }
    }
    //if either email or password dont exist
    else {
      res.status(400).json({ result: "Kindle Enter Email or Password !" }); // bad request 400
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function signupController(req, res) {
  try {
    let data = req.body;

    const email = data.email;
    const name = data.name;
    password = data.password;

    if (email && password && name) {
      let encryptedPassword = sha.x2(password);
      // console.log(encryptedPassword);
      data.password = encryptedPassword;
      // console.log(data);
      let newUser = await UserModel.create(data);
      const token = jwt.sign({ id: newUser["_id"] }, secret.JWT, {
        expiresIn: "2h",
      });
      res.cookie("JWT", token);
      newUser.password = undefined;
      newUser.confirmPassword = undefined;
      req.body = null;

      res.status(200).json(newUser);
    } else {
      res.status(400).json({ result: "Enter All details" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ result: e.message });
  }
}
async function forgetPasswordController(req, res) {
  try {
    let { email } = req.body;

    const otp = getOTP();
    const otpTime = setExpiry();

    const user = await UserModel.findOneAndUpdate(
      { email: email },
      { otp: otp, otpTime: otpTime }
    );
    await user.save();
    // console.log(await UserModel.find({ email: email }));

    // let OTPtemlate = getOTPtemlate(otp);

    await mailSender(otp, email); //send otp to mail nikhil.kops@gmail.com

    res.json({ result: "OTP Send to email" });
  } catch (err) {
    res.send(err.message);
  }
}

async function resetPasswordController(req, res) {
  try {
    let { otp, email, password, confirmPassword } = req.body;

    let user = await UserModel.findOneAndUpdate({ email }, { new: true });

    //there is a bug in the otp if i dont send otp in my JSON it will still able to chang password because undefine == undefiened
    if (user.otp && user.otp == otp) {
      if (Date.now() > user.otpTime) {
        //giving promise rejection unhandled when put otp after expiry date
        user.otp = undefined;
        user.otpTime = undefined;

        user.save();
        res.end("OTP Expired");
      }

      user.otp = undefined;
      user.otpTime = undefined;

      user.password = sha.x2(password);
      user.ConfirmPassword = sha.x2(confirmPassword);

      user.save();

      res.json(user);
    } else {
      res.send("Wrong OTP");
    }
  } catch (err) {
    console.log("Error in the reset password");
    res.send(err.message);
  }
}
module.exports = {
  loginController,
  signupController,
  forgetPasswordController,
  resetPasswordController,
};

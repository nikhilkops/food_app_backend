const otpGenerator = require("otp-generator"); // to generate OTP
const jwt = require("jsonwebtoken"); // to genertae and verify web token
const secret = require("../secret");
const nodemailer = require("nodemailer");

function getOTP() {
  return otpGenerator.generate(7, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
}

function setExpiry() {
  return Date.now() + 5 * 60 * 1000;
}

function getOTPtemlate(otp, email) {
  let template = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Cult Fit </a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Cult Fit. Use the following OTP to  Reset your Password of email id : ${email}. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br /> Cult Fit</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
         
      </div>
    </div>
  </div>`;
  return template;
}

async function mailSender(otp, email) {
  // input through which mechanism send your email

  //  -> port, facilitator (technical details)
  let template = getOTPtemlate(otp, email);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: secret.APP_EMAIL,
      pass: secret.APP_PASSWORD,
    },
  });

  let dataObj = {
    from: '"Cult Filt👻" <cultfit@support.com>', // sender address
    to: email, // list of receivers
    subject: "OTP for password recovery", // Subject line
    html: template,
  };
  // send mail with defined transporter object
  let info = await transporter.sendMail(dataObj);
  console.log("Email Send");
}

function protectRoute(req, res, next) {
  //Middlw ware to authorize if tthe use r is who they say they are
  //if logegd in allowed route
  const token = req.cookies;

  var decoded = jwt.verify(token.JWT, secret.JWT);

  next();

  //else not
}
module.exports = {
  getOTP,
  setExpiry,
  protectRoute,
  getOTPtemlate,
  mailSender,
};

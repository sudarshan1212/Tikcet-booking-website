const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const nodeMailer = require("nodemailer");
const userOTPVerification = require("../Model/userOTPVerfication");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const accessToken = (user) => {
  return jwt.sign(
    {
      user: {
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SERVER,
    { expiresIn: "15d" }
  );
};
const tranporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
//TESTING SUCESS
tranporter.verify((err, success) => {
  if (err) {
    console.log(err);
  }
  if (success) {
    console.log("Transportation verification:", success);
  }
});
const loginUser = asyncHandler(async (req, res) => {
  //
  let { email } = req.body;
  // email = email.trim();
  if (!email) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "Please enter the email" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      Status: "INVALID",
      message: "The email address you entered is not valid",
    });
  }
  const userExists = await User.findOne({ email });
  if (userExists == null || userExists.verfied == false) {
    const user = new User({
      email: email,
      verfied: false,
    });
    user
      .save()
      .then((result) => {
        if (result) {
          const token = accessToken(result);

          if (token) {
            //GENERATE THE OTP HERE'
            sendOTPVerficationEmail(result, token, res);
          }
        } else {
          return res
            .status(400)
            .json({ Status: "INVALID", message: "token dont get" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          Status: "INVALID",
          message: "Can't save The email in DataBase",
        });
      });
  } else if (userExists && userExists.verfied == true) {
    const user = await userExists.populate();
    if (user) {
      const token = accessToken(user);

      if (token) {
        res.status(200).json({
          Status: "SUCCESS",
          message: "Welcome Back",
          data: {
            email: user.email,
            _id: user._id,
            token: token,
          },
        });
      }
    } else {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "token dont get" });
    }
  }
});
//SEND OTP VERFICATIONN EMAIL
const sendOTPVerficationEmail = async ({ _id, email }, token, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter ${otp} in the website to verify your Email address</p>
      <p>This code <b>expires in 1 hour</b></p>`,
    };
    const saltROunds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltROunds);
    const newOTPVerification = await new userOTPVerification({
      userId: _id,
      hashedOTP: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    //SAVE OTP RECORD
    await newOTPVerification.save();
    await tranporter.sendMail(mailOption);
    res.status(200).json({
      Status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userID: _id,
        otp,
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
//VERIFY OTP VERFICATIONN EMAIL
const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      return res
        .status(400)
        .json({ Status: "INVALID", message: "Pls Enter the given details" });
    } else {
      const userOTPVerficationRecords = await userOTPVerification.find({
        userId,
      });
      if (userOTPVerficationRecords.length < 0) {
        //no record found
        return res
          .status(400)
          .json({ Status: "INVALID", message: "Register with your Email id" });
      } else {
        const { expiresAt } = userOTPVerficationRecords[0];
        const { hashedOTP } = userOTPVerficationRecords[0];
        console.log(expiresAt, hashedOTP);

        if (expiresAt < Date.now()) {
          await userOTPVerification.deleteMany({ userId });
          res
            .status(400)
            .json({ Status: "INVALID", message: "OTP has been expired" });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            res.status(400).json({ Status: "INVALID", message: "Invalid OTP" });
          } else {
            const users = await User.findOne({ _id: userId }).populate();
            console.log(users);
            await User.updateOne({ _id: userId }, { verfied: true });
            await userOTPVerification.deleteMany({ userId });
            res.status(200).json({
              Status: "VERIFIED",
              message: "Welcome",
              users,
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).json({ Status: "INVALID", message: "verifyOTP failed" });
    console.log(error);
  }
};
module.exports = { loginUser, verifyOTP };

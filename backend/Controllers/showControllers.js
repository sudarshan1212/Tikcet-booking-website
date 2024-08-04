const Show = require("../Model/showCategory");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

const registerHoster = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Enter the All fields" });
  }
  const exsistHoster = await Show.findOne({ email });
  if (exsistHoster) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "User already exsist" });
  }
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const newHoster = new Show({
        email: email,
        password: hashedPassword,
      });
      newHoster
        .save()
        .then((result) => {
          res
            .status(200)
            .json({ Status: "SUCCESS", message: "saved", data: result });
        })
        .catch((err) => {
          res.status(400).json({ Status: "INVALID", message: "" });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ Status: "INVALID", message: "password didn't hashed" });
    });
});
const userHoster = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Enter the All fields" });
  }
  Show.findOne({ email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          const token = accessToken(user);
          if (token) {
            res.status(200).json({
              Status: "SUCCESS",
              message: "token Generated",
              data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
              },
            });
          } else {
            res
              .status(400)
              .json({ Status: "INVALID", message: "token didn't genrated" });
          }
        })
        .catch((err) => {
          res
            .status(400)
            .json({ Status: "INVALID", message: "wrong password" });
        });
    })
    .catch((err) => {
      res.status(400).json({ Status: "INVALID", message: "Pls signUp" });
    });
});
module.exports = { registerHoster, userHoster };

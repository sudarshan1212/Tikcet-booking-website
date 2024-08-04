const Host = require("../Model/hostModel");
const asyncHandler = require("express-async-handler");
const postShow = asyncHandler(async (req, res) => {
  
  const {
    location,
    showName,
    image,
    seat,
    address,
    time,
    cancellation,
    food,
    category,
  } = req.body;
  if (
    !location ||
    !showName ||
    !image ||
    !seat ||
    !address ||
    !time ||
    !cancellation ||
    !food ||
    !category
  ) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "Fill all the field" });
  }
  const host = new Host({
    user: req.user._id,
    location: location,
    showName: showName,
    image: image,
    seat: seat,
    address: address,
    time: time,
    cancellation: cancellation,
    food: food,
    category: category,
  });
  host
    .save()
    .then((result) => {
      res
        .status(200)
        .json({ Status: "SUCCESS", message: "hosted", data: result });
    })
    .catch((err) => {
      res.status(400).json({ Status: "INVALID", message: "its nowt saved" });
    });
});
const getShow = asyncHandler(async (req, res) => {
  const show = await Host.find({ user: req.user.id });
  res.status(200).json({ Status: "SUCCESS", data: show });
});
const deleteShow = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const delelteShow = await Host.findByIdAndDelete(id);
  if (delelteShow) {
    res
      .status(200)
      .json({ Status: "SUCCESS", message: "deleted Successfully" });
  } else {
    res.status(400).json({ Status: "INVALID", message: "can't delete" });
  }
});
module.exports = { postShow, deleteShow, getShow };

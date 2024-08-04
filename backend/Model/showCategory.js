const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

//Export the model
module.exports = mongoose.model("show", showSchema);

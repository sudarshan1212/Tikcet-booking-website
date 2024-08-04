const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verfied: Boolean,
});

//Export the model
module.exports = mongoose.model("User", userSchema);

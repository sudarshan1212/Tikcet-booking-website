const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const showSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "show",
  },
  location: {
    type: String,
    required: true,
  },
  category: { type: String, enum: ["theater", "concert", "entertainment"] },

  showName: { type: String, required: true }, 
  image: { type: String, required: true },
  seat: { type: Number, required: true },
  address: { type: String, required: true },
  time: { type: [String], required: true },
  cancellation: { type: Boolean, required: true },
  food: { type: Boolean, required: true },
});

//Export the model
module.exports = mongoose.model("host", showSchema);

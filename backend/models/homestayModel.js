const mongoose = require("mongoose");

// Homestay Schema
const homestaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

// Model
const Homestay = mongoose.model("Homestay", homestaySchema);

module.exports = Homestay;
const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is Required",
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    country: {
      type: String,
      trim: true,
      text: true,
    },
    address: {
      type: String,
      text: true,
    },
    images: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const roomSchema = mongoose.Schema(
  {
    roomtype: {
      type: String,
      trim: true,
      required: "Name is Required",
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    startdate: Date,
    enddate: Date,
    images: {
      type: Array,
    },
    parent: {
      type: ObjectId,
      ref: "Hotel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

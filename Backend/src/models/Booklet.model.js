const mongoose = require("mongoose");

const bookletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assumes you have a User model
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slides: {
      type: [String], // array of slide texts
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one slide is required",
      },
    },
  },
  { timestamps: true }
);

const bookModel  = mongoose.model('booklet',bookletSchema);
module.exports = bookModel;

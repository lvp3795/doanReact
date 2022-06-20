const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "product name must be provided"],
      unique: true,
      cast: false,
    },
    price: {
      type: Number,
      require: [true, "product price must be provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 1,
    },
    company: {
      type: String,
      enum: {
        values: ["Casio", "Citizen", "Doxa", "Tissot", "Seiko", "Rolex"],
        message: "{VALUE} is not supported",
      },
      default: "Casio",
    },
    gender: {
      type: String,
      enum: {
        values: ["Nam", "Nữ"],
        message: "{VALUE} is not supported",
      },
      default: "Nam",
    },
    picture: {
      type: String,
      default: "1.png",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    stockCount: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

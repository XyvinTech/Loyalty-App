const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", BrandSchema);

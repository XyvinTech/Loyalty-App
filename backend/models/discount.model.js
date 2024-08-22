const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discount_code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    tier_required: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tier",
        required: true,
      },
    ],
    apps: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'App',
      // required: true
    }],

    valid_from: {
      type: String,
      // required: true
    },
    valid_to: {
      type: String,
      // required: true
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "expired"],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Discount", DiscountSchema);
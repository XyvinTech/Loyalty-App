const mongoose = require("mongoose");

const PointsCriteriaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    points: {
      type: Number,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    conditions: {
      limit: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PointsCriteria", PointsCriteriaSchema);

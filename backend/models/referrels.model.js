const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema(
  {
    referrerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referredId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    pointsAwarded: {
      type: Number,
      default: 0,
    },
    action: {
      type: String,
      // enum: ['signup', 'purchase', 'custom'],
      required: true,
    },
    isActionCompleted: {
      type: Boolean,
      default: false,
    },
    actionCompletedAt: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Referral", ReferralSchema);

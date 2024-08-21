
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      // index: true,
    },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    discountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    pointCriteriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PointsCriteria",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: Object,
    },
    note: {
      type: Object
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    pointsRedeemed: {
      type: Number,
      default: 0,
    },
    transactionType: {
      type: String,
      enum: ["discount", "coupon", "earn"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

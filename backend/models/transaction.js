// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema(
//   {
//     transactionId: {
//       type: String,
//     },
//     coupon_id: "ObjectId", // Reference to Coupons, nullable for earning and discount transactions
//     discount_id: "ObjectId", // Reference to Discounts, nullable for earning and reward transactions
//     point_criteria: "ObjectId", // Reference to poit_critera
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     ClientId:{
//       type: Object
//     },
//     note:{
//       type: Object
//     },
//     status: {
//       type: String,
//       default: "pending",
//       enum: ["success", "failed", "pending"],
//       required: true,
//     },
//     points_redeemed: {
//       type: Number,   // Reference to Coupons,Discounts , nullable for earning
//     },
//     transaction_type:{
//       enum: ["discount", "coupon", "earn"],
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Transaction", TransactionSchema);

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
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
    discountId: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    pointCriteriaId: {
      type: Schema.Types.ObjectId,
      ref: "PointsCriteria",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientId: {
      type: Object,
    },
    note: {
      type: String,
      maxlength: 500,
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

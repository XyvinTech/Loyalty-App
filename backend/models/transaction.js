const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
    },
    loyality_card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loyality",
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    note:{
      type: Object
    },
    status: {
      type: String,
      default: "pending",
      enum: ["success", "failed", "pending"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);

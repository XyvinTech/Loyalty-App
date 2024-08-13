const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      //   index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    clientCompany: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    tier: {
      type: Schema.Types.ObjectId,
      ref: "Tier",
    },
    referralCode: {
      type: String,
      unique: true,
      index: true,
    },
    referredUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

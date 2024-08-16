const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Brand',
    // required: true
  },
  image: {
    type: String,
    // required: true
  },
  otp: {
    type: Number,
    // required: true
  },
  points_required: {
    type: Number,
    required: true
  },
  coin_cost:{
    type: Number,
    required: true
  },
  starts_from:{
    type: String,
    // required: true
  },
  expiry: {
    type: String,
    // required: true
  },
  no_of_cards: {
    type: Number,
    required: true,
  },
  availability_criteria:{
    type: String,
    // required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    // required: true
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive", "expired","limit exceeded"],
    required: true
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('coupon', CouponSchema);

const mongoose = require('mongoose');

const LoyaltySchema = new mongoose.Schema({
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
    required: true
  },
  image: {
    type: String,
    required: true
  },
  OTP: {
    type: Number,
    required: true
  },
  coin_worth: {
    type: Number,
    required: true
  },
  coin_cost:{
    type: Number,
    required: true
  },
  expiry: {
    type: String,
    required: true
  },
  no_of_cards: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive", "expired"],
    required: true
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Loyality', LoyaltySchema);


const Coupon = require('../models/coupon.model')
const moment = require('moment')
const User = require('../models/user');
const Transaction = require('../models/transaction');
const { createTransaction } = require('./transactionController');
//create coupon

exports.createCoupon = async (req, res) => {
  console.log(req.body)
  try {
    const getCoupon = await Coupon.findOne({ title: req.body.title })
    if (getCoupon) {
      res.status(500).send({ status: false, message: 'already have a coupon' });
      return
    }
    let value = req.body
    value.category = value.category.value
    value.brand = value.brand.value
    value.availability_criteria = value.availability_criteria.label
    value.apps = value.apps.value



    const coupon = new Coupon(value);
    await coupon.save();
    res.status(201).send({ status: true, coupon });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get coupon
exports.getCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .populate({
        path: 'category',
        select: 'title' // Select only the title from category
      })
      .populate({
        path: 'brand',
        select: 'title' // Select only the name from brand (or any relevant field)
      })
      .exec();
    console.log(coupons)
    let formatData = coupons.map(cou => (
      {
        _id: cou._id,
        title: cou.title,
        description: cou.description,
        brand: cou.brand?.title,
        image: cou.image ? cou.image : 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
        pin: cou.pin,
        pointsRequired: cou.points_required,
        coinCost: cou.coin_cost,
        startsFrom: cou.starts_from,
        expiry: cou.expiry,
        // noOfCards: cou.no_of_cards,
        availabilityCriteria: cou.availability_criteria,
        category: cou.category.title,
        status: cou.status,
        createdAt: moment.utc(cou.createdAt).format("D/M/YYYY"),
      }))
    res.status(200).send({ status: true, result: formatData });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

// edit coupon
exports.editCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).send({ status: true, message: "Successfully edited" });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

//delete coupon
exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete({ _id: req.params.id })
    res.status(200).send({ status: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};



exports.redeemCoupon = async (req, res) => {
  try {
    const { couponId, pin, userId, note } = req.body;
    const checkPin = await Coupon.findOne({ _id: couponId, pin: pin }).select(" points_required");
    const transactionData = {

      userId: userId,
      type: "coupon",
      relatedId: couponId,
      pointsRedeemed: checkPin.points_required,
      note: note ? note : ""
    };
    const user = await User.findById(userId)
    //to check user points
    if (user.points < checkPin.points_required) {
      throw new Error('User has no sufficient points')
    }
    if (checkPin) {
      await User.updateOne({ _id: userId }, { $inc: { points: -checkPin.points_required }, });
      await createTransaction(transactionData);

      res.status(200).send({ status: true, message: "OTP verified successfully", data: checkPin });
    } else {
      res.status(400).send({ status: false, message: "OTP verification failed" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.releaseCoupon = async (req, res) => {
  try {
    const { userId, tier } = req.body
    const coupons = await Coupon.find({tier_required: tier})
      .populate({
        path: 'category',
        select: 'title' // Select only the title from category
      })
      .populate({
        path: 'brand',
        select: 'title' // Select only the name from brand (or any relevant field)
      })
      .exec();
    let formatData = coupons.map(cou => (
      {
        _id: cou._id,
        title: cou.title,
        description: cou.description,
        brand: cou.brand?.title,
        image: cou.image ? cou.image : 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg',
        pin: cou.pin,
        pointsRequired: cou.points_required,
        coinCost: cou.coin_cost,
        startsFrom: cou.starts_from,
        expiry: cou.expiry,
        // noOfCards: cou.no_of_cards,
        availabilityCriteria: cou.availability_criteria,
        category: cou.category.title,
        status: cou.status,
        createdAt: moment.utc(cou.createdAt).format("D/M/YYYY"),
      }))
    res.status(200).send({ status: true, result: formatData });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

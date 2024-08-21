const couponRouter = require('express').Router()
const couponController = require("../controllers/couponController");


couponRouter
  .route("/coupon")
  .get(couponController.getCoupon)
  .post(couponController.createCoupon);

couponRouter
  .route("/coupon/:id")
  .put(couponController.editCoupon)
  .delete(couponController.deleteCoupon);

  couponRouter
  .route("/redeemCoupon")
  .post(couponController.redeemCoupon);

  module.exports = couponRouter
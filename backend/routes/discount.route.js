const discountRouter = require('express').Router()
const discountController = require('../controllers/discountController')

discountRouter
  .route("/discount")
  .get( discountController.getDiscount)
  .post( discountController.createDiscount);

discountRouter
  .route("/discount/:id")
  .get(discountController.getDiscountById)
  .put( discountController.editDiscount)
  .delete( discountController.deleteDiscount);


  module.exports = discountRouter

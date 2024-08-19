const brandRouter = require('express').Router()
const brandController = require('../controllers/brandController')

brandRouter
  .route("/brand")
  .get(brandController.getBrand)
  .post(brandController.createBrand);

brandRouter
  .route("/brand/:id")
  .put(brandController.editBrand)
  .delete(brandController.deleteBrand);

  module.exports = brandRouter;
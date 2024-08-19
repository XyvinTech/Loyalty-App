const categoryRouter = require('express').Router()
const categoryController = require("../controllers/categoryController");

categoryRouter
  .route("/category")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory);

categoryRouter
  .route("/category/:id")
  .put(categoryController.editCategory)
  .delete(categoryController.deleteCategory);

  module.exports = categoryRouter
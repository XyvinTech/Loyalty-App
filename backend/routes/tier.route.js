const tierRouter = require('express').Router()
const tierController = require("../controllers/tierController");


tierRouter
  .route("/tier")
  .get(tierController.getTier)
  .post(tierController.createTier);

tierRouter
  .route("/tier/:id")
  .get(tierController.getTierById)
  .put(tierController.editTier)
  .delete(tierController.deleteTier);

  module.exports = tierRouter;
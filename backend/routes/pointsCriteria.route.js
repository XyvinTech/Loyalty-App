const pointsCriteriaRouter = require("express").Router();
const pointsCriteriaController = require("../controllers/pointsCriteria.controller");

pointsCriteriaRouter
  .route("/points-criteria")
  .get(pointsCriteriaController.getAllPointsCriteria)
  .post(pointsCriteriaController.createPointsCriteria);

pointsCriteriaRouter
  .route("/points-criteria/:id")
  .get(pointsCriteriaController.getPointsCriteriaById)
  .put(pointsCriteriaController.updatePointsCriteria)
  .delete(pointsCriteriaController.deletePointsCriteria);




  pointsCriteriaRouter.route("/points/trigger")
  .post(pointsCriteriaController.triggerPoints)
    
    
    
    


module.exports = pointsCriteriaRouter;

const pointsCriteriaRouter = require("express").Router();
const pointsCriteriaController = require("../controllers/pointsCriteria.controller");

pointsCriteriaRouter.get(
  "/points-criterias",
  pointsCriteriaController.getAllPointsCriteria
);

pointsCriteriaRouter.post(
  "/points-criteria",
  pointsCriteriaController.createPointsCriteria
);

pointsCriteriaRouter.route('/points-criteria/:id')
    .get(pointsCriteriaController.getPointsCriteriaById)
    .put(pointsCriteriaController.editCategory)
    .delete(pointsCriteriaController.deleteCategory)

module.exports = pointsCriteriaRouter;

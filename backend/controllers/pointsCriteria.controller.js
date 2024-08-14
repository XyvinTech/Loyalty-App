const PointsCriteria = require("../models/pointsCriteria.model");

// Create a new Points Criteria
exports.createPointsCriteria = async (req, res) => {
  console.log("createPointsCriteria hiited")
  try {
    const newCriteria = new PointsCriteria(req.body);
    await newCriteria.save();
    res.status(201).send({ status: true, data: newCriteria });
  } catch (error) {
    console.error("Error creating points criteria:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Get all Points Criteria
exports.getAllPointsCriteria = async (req, res) => {
  try {
    const criteriaList = await PointsCriteria.find();
    res.status(200).send({ status: true, data: criteriaList });
  } catch (error) {
    console.error("Error fetching points criteria:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Get a single Points Criteria by ID
exports.getPointsCriteriaById = async (req, res) => {
  try {
    const criteria = await PointsCriteria.findById(req.params.id);
    if (!criteria) {
      return res.status(404).send({ status: false, error: "Points criteria not found" });
    }
    res.status(200).send({ status: true, data: criteria });
  } catch (error) {
    console.error("Error fetching points criteria by ID:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Update a Points Criteria by ID
exports.updatePointsCriteria = async (req, res) => {
  try {
    const updatedCriteria = await PointsCriteria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCriteria) {
      return res.status(404).send({ status: false, error: "Points criteria not found" });
    }
    res.status(200).send({ status: true, data: updatedCriteria });
  } catch (error) {
    console.error("Error updating points criteria:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Delete a Points Criteria by ID
exports.deletePointsCriteria = async (req, res) => {
  try {
    const deletedCriteria = await PointsCriteria.findByIdAndDelete(req.params.id);
    if (!deletedCriteria) {
      return res.status(404).send({ status: false, error: "Points criteria not found" });
    }
    res.status(200).send({ status: true, message: "Points criteria deleted successfully" });
  } catch (error) {
    console.error("Error deleting points criteria:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

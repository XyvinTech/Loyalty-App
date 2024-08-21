const PointsCriteria = require("../models/pointsCriteria.model");
const User = require("../models/user");

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


exports.triggerPoints = async (req, res) => {

  const { action, userId } = req.body;
  console.log("Trigger hit"); //for debug

  if (!action) {
    return res.status(400).json({ error: "Action is required" });
  }

  const actionType = await PointsCriteria.findOne({ title: action });
  if (!actionType) {
    return res.status(400).json({ error: "Action not found in db" });
  }

  const actionPoint = actionType.points;

  try {
    const user = await User.findById(userId);
    // console.log(user); //for debug
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userLimit = await ActionUser.countDocuments({
      userId: user._id,
      action: actionType._id,
    });
    console.log("userLimit : ", userLimit)
    if (userLimit > actionType.limit) {
      return res
        .status(400)
        .json({ error: "User has already reached the limit for this action " });
    }
    const newAction = new ActionUser({
      userId: user._id,
      action: actionType._id,
    });
    await newAction.save();

    user.points += actionPoint;
    await user.save();

    res.status(200).json({
      message: `Action "${action}" triggered successfully`,
      totalPoints: user.points,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }




}
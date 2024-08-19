const mongoose = require("mongoose");

const actionUserSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  action: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PointsCriteria",
    required: true,
  },
};

module.exports = mongoose.model("ActionUser", actionUserSchema);



const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({

   referral_id:{
    type: mongoose.Schema.Types.ObjectId,
      ref: "PointsCriteria",
      required: true,
   },
   referrer_id: "ObjectId", // Reference to the referring user
   referred_id: "ObjectId", // Reference to the referred user
   points_awarded: "Number",

   action: "String", // e.g., 'signup', '1st purchase',
   isActionCompleted:Boolean

}, {
    timestamps: true,
})


module.exports = mongoose.model("tier", TierSchema);

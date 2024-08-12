const mongoose = require("mongoose");

const TierSchema = new mongoose.Schema({

   tier_name:{
    type:String
   },
   point_level:{
    type:Number
   }

}, {
    timestamps: true,
})


module.exports = mongoose.model("tier", TierSchema);

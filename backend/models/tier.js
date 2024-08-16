const mongoose = require("mongoose");

const TierSchema = new mongoose.Schema({
   id: {
    type : String,
    required :true,
    trim : true
   },
   tier_name:{
    type:String,
    required:true,
   },
   point_level:{
    type:Number,
    required:true
   }

}, {
    timestamps: true,
})


module.exports = mongoose.model("tier", TierSchema);

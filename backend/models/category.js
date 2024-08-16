const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  id : {
    type : String,
    required : true,
    trim : true
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
},{
    timestamps:true
});

module.exports = mongoose.model('Category', CategorySchema);

const mongoose = require('mongoose')

const AppSchema = new mongoose.Schema(
    {
    title : {
        type : String,
        required :true,
        trim : true
    } , 
    logo :{
        type: String,
        // required:true,
        trim : true
    },
    description : {
        type : String,
        // required: true,
        trim : true
    }

    },
    {
        timestamps:true
    }
)

module.exports =  mongoose.model('app', AppSchema)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    client_company: {
        type: String,
    },
    points: {
        type: Number,
        
    },
    tier: {
        type: String,
    },
    referred_code:{},
    referred_user_id:{}


}, {
    timestamps: true,
})


module.exports = mongoose.model("user", UserSchema);

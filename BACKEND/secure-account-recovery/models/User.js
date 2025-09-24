const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password:{
        type:String,
        required:[true, "Password required"],
    },
    passwordResetToken: String,
    passwordResetExpires:Date,
})

module.exports = mongoose.model("User",userSchema);
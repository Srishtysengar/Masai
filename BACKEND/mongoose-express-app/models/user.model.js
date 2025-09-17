const mongoose=require("mongoose");

//create Schema
const userSchema= new mongoose.Schema(
    {
        name:{type:String, required:true},
        age:{type:Number,min:20, max:100},  //age is validated btw20 to 100
        email:{type:String, required:true, unique:true},
        isMarried:Boolean,
        location:String,
        gender:{type:String, enum:["male","female"]} //only words "male" and "female" are allowed
    }
)

//create model
//User:collection name
//userSchema:schema or blueprint
//userModel is responsible to interact with db
const userModel=mongoose.model("User", userSchema)

module.exports=userModel;
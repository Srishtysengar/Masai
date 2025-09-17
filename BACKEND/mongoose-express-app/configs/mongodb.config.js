//we will create a function which connects  mongoDB with Nodejs

const mongoose=require("mongoose");

const connectToDb = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/mongoosetest")
        console.log("Connected to db")
    }catch(err){
        console.log("error in connecting", err)
    } 
}
module.exports = connectToDb;
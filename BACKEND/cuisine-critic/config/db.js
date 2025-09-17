const mongoose=require("mongoose");

const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to db")
    }catch(err){
        console.log("error in connecting", err)
    } 
}
module.exports = connectToDb;
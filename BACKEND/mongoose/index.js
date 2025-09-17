const mongoose=require("mongoose");   //import mongoose

//establish a connection with mongodb

const connectToDb = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/backendtest')
         //backendtest=> it is a database in mongodb
        console.log("Connected to db");
    } catch (err) {
        console.log("error in Connecting to db");
        console.log(err)
    }
}

connectToDb();

/// create a Schema
///Schema is basic structure/blue print of how our typical document should look

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    location:String,
    isMarried:Boolean,
})

//Schema will directly interact with mongo?? NO
// Schema is just helps to maintain structure
// Model is responsible to interact with DB
// Model is constructor which connects Collection and Schema

const UserModel = mongoose.model("user", userSchema)
 //User is Collection Name

 // make a typical interation with db
//method 1 .create()
//  UserModel.create({name:"Alice", age:34, location:"Delhi", isMarried:false}).then(()=>{
//     console.log("Data Added")
//  })

 //there is no insertOne in mongoose
 //.create() or new and .save()

 //method 2, new and .save()
//  let newUser=new UserModel({name:"Charlie", age:37, location:"Mumbai", isMarried:true})

//  newUser.save().then(()=>{
//     console.log("Data Added")
//  }).catch((err)=>{
//     console.log("Error", err)
//  })


 let user=UserModel.find();
 user.then((data)=>{
    console.log(data)
 }).catch((err)=>{
    console.log(err);
 })

 //updating the user 
let updatedUser= UserModel.findByIdAndUpdate('68c9348c60c50f2110e6890f',{name:'Srishty'} )

updatedUser.then(()=>{
    console.log("updated")
}).catch((err)=>{
    console.log(err);
 })
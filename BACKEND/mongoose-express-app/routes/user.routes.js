const express=require("express");
const UserModel=require("../models/user.model")

const UserRouter=express.Router();

//get all users from user collection
UserRouter.get("/", async (req,res)=>{
    //find all the documents present in user collection through userModel
    try {
        let users=await UserModel.find({}); //retreives all the documents from user collection
        res.status(200).json({msg:"User List", users})
    } catch (err) {
        res.status(500).json({msg:"something went wrong"})
    }
})

//add user into user collection
UserRouter.post("/add-user",async (req,res)=>{
    //name,age,isMarried,location, email is coming from request.body
    try{
        console.log(req.body);
    //add the request.body in db by calling user model
    //insertOne XXXXXX
    //inserMany ---> []
    // new & .save()
    // .create() --> accepts object and req.body is also object, hence can be passed directly
    let user= await UserModel.create(req.body)
    res.status(201).json({msg:"user Added", user});
    }catch(err){
          res.status(404).json({msg:"Something went wrong", err})
    }
})

//update user by id
UserRouter.patch("/update-user/:userId", async(req,res)=>{
    //user id is coming from path params
    //data to be updated is coming from req.body
    try {
         const {userId} =req.params
    let user= await UserModel.findById(userId)
    if(!user){
        res.status(404).json({msg:"user not found"})
    }else{
        // user found
        // update the data coming from the above user
        await UserModel.findByIdAndUpdate(userId, req.body)
        res.status(201).json({msg:"user updated"})
    }
    } catch (err) {
        res.status(404).json({msg:"Something went wrong", err})
        
    }
})
//delete user by id
UserRouter.delete("/delete-user/:userId", async(req,res)=>{
    //user id is coming from path params
    try {
         const {userId} =req.params
    let user= await UserModel.findById(userId)
    if(!user){
        res.status(404).json({msg:"user not found"})
    }else{
        // user found
        // update the data coming from the above user
        await UserModel.findByIdAndDelete(userId, req.body)
        res.status(201).json({msg:"user deleted"})
    }
    } catch (err) {
        res.status(404).json({msg:"Something went wrong", err})
        
    }
})

module.exports=UserRouter;

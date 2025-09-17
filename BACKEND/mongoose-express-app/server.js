//Step:1 create basic express setup
//step:2 connect MongoDb with Nodejs through mongoose
//step:3 create schema and model
//step:4 Import model and create route and perform crud operations

const express=require("express");
const connectToDb = require("./configs/mongodb.config");
const UserRouter = require("./routes/user.routes")

connectToDb()

const app=express();

app.use(express.json()); //json body parser middleware

app.use("/users",UserRouter)
app.listen(3000, ()=>{
    console.log("Server started....")
})
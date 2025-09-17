const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurant.routes");
const reviewRoutes = require("./routes/review.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler")
const connectToDb = require("./config/db");

connectToDb();

const app = express();

//middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json())

// Routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is Required"],
        },
        email:{
            type:String,
            required:[true, "Email is Required"],
            unique: true,
            lowercase: true,
            match: [/.@.+\..+/,"Please enter a valid email"],
        },
        password:{
            type: String,
            required: [true, "Password is Required"],
            minlength: 6,
        },
        role:{
            type: String,
            enum:["Admin", "Member"],
            default: "Member"
        },
    },
    {timestamps:true}
);

//encrypt password before saving
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema)
export default User;
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//register user
exports.register = async (req,res)=>{
    try {
        const {email, password} =req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, password:hashedPassword});

        res.status(201).json({success: true, data:{id:user._id, email} });
    } catch (error) {
        res.status(400).json({success: false, error:error.message });
    }
};

//login user
exports.login = async (req,res)=>{
    try {
        const {email, password} =req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success: false, error:"invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({success: false, error:"invalid credentials" });

        const token = generateToken(user._id);

        res.status(201).json({success: true, token });
    } catch (error) {
        res.status(500).json({success: false, error:error.message });
    }
};

//forgot password
exports.forgotPassword = async (req,res)=>{
    try {
        const {email} =req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({success: true, message:"if that email exists, reset link sent" });

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.passwordResetToken=hashedToken;
        user.passwordResetExpires=Date.now()+10*60*1000;
        await user.save();

        const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
        const message = `You requested a password reset. Click here: ${resetUrl}`;

        await sendEmail({
            to:user.email,
            subject:"Password Reset",
            message,
        });

        res.status(201).json({success: true, message: "Reset Link sent to your registered email" });
    } catch (error) {
        console.log("forgot password error:", error);
        res.status(500).json({success: false, error:error.message });
    }
};

//reset password
exports.resetPassword = async (req,res)=>{
    try {
        const resetToken = req.params.token;

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
        const user = await User.findOne({
            passwordResetToken:hashedToken,
            passwordResetExpires: {$gt:Date.now()},
        });

        if(!user) return res.status(400).json({success:false, error:"Token invalid or expired"});

        user.password=await bcrypt.hash(req.body.password, 10);
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;

        await user.save();

        res.status(201).json({success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({success: false, error:error.message });
    }
};
import express from "express";
import{
    registerUser,
    loginUser,
    getProfile
} from "../controllers/authController.js";
import {protect} from "../middleware/auth.js"

const router =express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profilr",protect, getProfile);

export default router;
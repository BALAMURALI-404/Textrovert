import express from "express";
import { login, logout, signup, updateProfile } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile",updateProfile)

export default router;
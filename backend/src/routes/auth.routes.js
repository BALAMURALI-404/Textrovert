import express from "express";
import { checkAuth, login, logout, signup, updateName, updateProfile, verifyEmail } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.get("/verify/:token", verifyEmail);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile", protectRoute ,updateProfile);
router.put("/update-name",protectRoute,updateName)

router.get("/check", protectRoute, checkAuth);

export default router;
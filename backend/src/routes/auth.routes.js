import express from "express";
import { checkAuth, login, logout, signup, verifyEmail } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.get("/verify/:token", verifyEmail);
router.post("/login",login);
router.post("/logout",logout);
router.get("/check", protectRoute, checkAuth);

export default router;
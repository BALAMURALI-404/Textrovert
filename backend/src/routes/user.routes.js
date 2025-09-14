import express from "express";
import { protectRoute } from '../middleware/auth.middleware.js';
import { searchUsers, updateName, updateProfile,} from "../controller/user.controller.js";

const router = express.Router();

router.put("/update-profile", protectRoute ,updateProfile);
router.put("/update-name",protectRoute,updateName);
router.get("/search",protectRoute,searchUsers);

export default router;
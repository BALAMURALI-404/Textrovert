import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getMessages, getUsersForSideBar, sendMessage } from '../controller/message.controller';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSideBar);
router.get('/:id', protectRoute, getMessages);

router.post('send/:id', protectRoute, sendMessage);

export default router;
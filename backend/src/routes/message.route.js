import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar, getMessagesBetweenUsers, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessagesBetweenUsers)

router.post("/send", protectRoute, sendMessage)

export default router;

import express from "express";
import { authenticateUser, getProfile } from "../middleware/authMiddleware.js";
import * as chatController from '../controllers/chat.js'


const router = express.Router()

router.post('/send', authenticateUser, getProfile, chatController.sendMessage)

router.get('/unread-count', authenticateUser, getProfile, chatController.getUserUnreadCount);



export default router
import express from 'express';
import { authenticateUser, getProfile, requireRole } from '../middleware/authMiddleware.js';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/profile', authenticateUser, getProfile, userController.createUserProfile);

router.get('/profile', authenticateUser, getProfile, userController.getUserProfile);

router.put('/profile', authenticateUser, getProfile, userController.updateUserProfile);

router.get('/', authenticateUser, requireRole('admin'), userController.getAllUsers);

router.delete('/profile/:uid', authenticateUser, requireRole('admin'), userController.deleteUserProfile);

export default router;
import express from 'express';
import { authenticateUser, requireRole } from '../middleware/authMiddleware.js';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/profile', authenticateUser, userController.createUserProfile);

router.get('/profile/:uid', authenticateUser, userController.getUserProfile);

router.put('/profile/:uid', authenticateUser, userController.updateUserProfile);

router.get('/', authenticateUser, requireRole('admin'), userController.getAllUsers);

router.delete('/profile/:uid', authenticateUser, requireRole('admin'), userController.deleteUserProfile);

export default router;
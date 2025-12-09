import express from 'express';
import * as activityController from '../controllers/activity.js';
import { authenticateUser, getProfile, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes - authenticated users can manage their own activities
router.post(
    '/create', 
    authenticateUser, 
    getProfile,
    activityController.createActivity
);

router.get(
    '/', 
    authenticateUser, 
    getProfile,
    activityController.getActivities
);

router.get(
    '/:activityId', 
    authenticateUser, 
    getProfile,
    activityController.getActivityById
);

router.patch(
    '/:activityId/status', 
    authenticateUser, 
    getProfile,
    activityController.updateActivityStatus
);

router.patch(
    '/mark-all-read', 
    authenticateUser, 
    getProfile,
    activityController.markAllAsRead
);

router.delete(
    '/:activityId', 
    authenticateUser, 
    getProfile,
    activityController.deleteActivity
);

router.delete(
    '/', 
    authenticateUser, 
    getProfile,
    activityController.deleteAllActivities
);

// Admin routes - only admins can create activities for other users
router.post(
    '/admin/create', 
    authenticateUser, 
    requireRole('admin'), 
    activityController.createActivityFromAdmin
);

export default router;
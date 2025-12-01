import express from 'express';
import * as reportController from '../controllers/report.js';
import upload from '../middleware/upload.js';
import { authenticateUser, getProfile, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post(
    '/create', 
    authenticateUser, 
    getProfile, 
    upload.array('evidence', 5), 
    reportController.createReport
);

router.get(
    '/', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.getReports
);

router.get(
    '/statistics', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.getReportStatistics
);

router.post(
    '/unresolved-count', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.getUnresolvedReportCount
);

router.get(
    '/:reportId', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.getReportById
);

router.patch('/:reportId/escalate', authenticateUser, reportController.escalateReport);

router.patch(
    '/:reportId/status', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.updateReportStatus
);

router.patch(
    '/:reportId/priority', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.updateReportPriority
);

router.delete(
    '/:reportId', 
    authenticateUser, 
    requireRole('admin'), 
    reportController.deleteReport
);

export default router;
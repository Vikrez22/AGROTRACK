import { db, admin } from "../config/firebase.js";
import { storage } from "../config/appwrite.js";
import { ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

/**
 * Controller to create a new report in the centralized 'reports' collection
 * with optional file evidence uploaded to Appwrite Storage
 */
export const createReport = async (req, res) => {
    try {
        const { type, location, description } = req.body;
        const { displayName, LGA, phoneNumber, uid } = req.userData;
        const files = req.files;

        if (!type || !location) {
            return res.status(400).json({
                success: false,
                error: "Report 'type' and 'location' are required."
            });
        }

        console.log(`Attempting to create a new report for LGA: ${LGA}`);

        const evidenceUrls = [];
        if (files && files.length > 0) {
            const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

            for (const file of files) {
                try {
                    const fileId = ID.unique();
                    
                    const uploadedFile = await storage.createFile(
                        BUCKET_ID,
                        fileId,
                        InputFile.fromBuffer(file.buffer, file.originalname)
                    );

                    const fileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

                    evidenceUrls.push({
                        fileId: uploadedFile.$id,
                        url: fileUrl,
                        filename: file.originalname,
                        contentType: file.mimetype,
                        size: file.size,
                        uploadedAt: admin.firestore.FieldValue.serverTimestamp()
                    });

                    console.log(`File uploaded: ${file.originalname} (ID: ${uploadedFile.$id})`);
                } catch (uploadError) {
                    console.error('Error uploading file to Appwrite:', uploadError);
                }
            }
        }

        const reportData = {
            displayName,
            userId: uid,
            type: type.trim(),
            location: location.trim(),
            description,
            isAnonymous: false,
            phoneNumber,
            LGA,
            evidence: evidenceUrls,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'Pending',
            priority: 'Medium',
        };

        const docRef = await db.collection('reports').add(reportData);

        res.status(201).json({
            success: true,
            reportId: docRef.id,
            LGA,
            evidenceCount: evidenceUrls.length
        });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to get the count of unresolved reports for a specific LGA
 */
export const getUnresolvedReportCount = async (req, res) => {
    try {
        const LGA = req.body.LGA || req.userData.LGA;

        if (!LGA) {
            return res.status(400).json({
                success: false,
                error: "LGA is required"
            });
        }

        const reportsSnapshot = await db
            .collection('reports')
            .where('LGA', '==', LGA)
            .where('status', 'in', ['Pending', 'In Progress', 'Escalated', 'Police'])
            .get();

        const unresolvedCount = reportsSnapshot.size;

        res.status(200).json({
            success: true,
            LGA,
            unresolvedCount
        });
    } catch (error) {
        console.error('Error getting unresolved report count:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to get all reports with optional filters
 * NOTE: For status and type filtering to work, you need to create composite indexes in Firebase
 */
export const getReports = async (req, res) => {
    try {
        const { 
            LGA, 
            status, 
            priority, 
            type,
            userId,
            limit = 100, 
            orderBy = 'createdAt', 
            order = 'desc' 
        } = req.query;

        console.log(`Fetching reports with filters:`, { LGA, status, priority, type, userId });

        let query = db.collection('reports');

        // Apply filters - NOTE: Multiple where clauses require composite indexes
        if (LGA) {
            query = query.where('LGA', '==', LGA);
        }

        if (status) {
            query = query.where('status', '==', status);
        }

        if (priority) {
            query = query.where('priority', '==', priority);
        }

        if (type) {
            query = query.where('type', '==', type);
        }

        if (userId) {
            query = query.where('userId', '==', userId);
        }

        // Apply ordering and limit
        query = query.orderBy(orderBy, order).limit(parseInt(limit));

        const snapshot = await query.get();

        const reports = [];
        snapshot.forEach(doc => {
            reports.push({
                reportId: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });
    } catch (error) {
        console.error('Error getting reports:', error);
        
        // Check if error is due to missing index
        if (error.code === 5 || error.message.includes('index')) {
            return res.status(400).json({
                success: false,
                error: 'This query requires a Firebase index. Please create the index using the URL provided in the server logs.',
                details: error.message
            });
        }
        
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to get a single report by ID
 */
export const getReportById = async (req, res) => {
    try {
        const { reportId } = req.params;

        if (!reportId) {
            return res.status(400).json({
                success: false,
                error: "Report ID is required"
            });
        }

        const reportDoc = await db
            .collection('reports')
            .doc(reportId)
            .get();

        if (!reportDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            report: {
                reportId: reportDoc.id,
                ...reportDoc.data()
            }
        });
    } catch (error) {
        console.error('Error getting report by ID:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to update report status
 * Now includes 'Dismissed', 'Escalated', and 'Police' statuses
 */
export const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'In Progress', 'Resolved', 'Dismissed', 'Escalated', 'Police'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }

        const reportRef = db.collection('reports').doc(reportId);

        const reportDoc = await reportRef.get();
        if (!reportDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Report not found"
            });
        }

        await reportRef.update({
            status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Report status updated to ${status}`,
            reportId
        });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to update report priority
 */
export const updateReportPriority = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { priority } = req.body;

        const validPriorities = ['Low', 'Medium', 'High'];
        if (!priority || !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                error: `Priority must be one of: ${validPriorities.join(', ')}`
            });
        }

        const reportRef = db.collection('reports').doc(reportId);

        const reportDoc = await reportRef.get();
        if (!reportDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Report not found"
            });
        }

        await reportRef.update({
            priority,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Report priority updated to ${priority}`,
            reportId
        });
    } catch (error) {
        console.error('Error updating report priority:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * NEW: Controller to escalate a report (sets status to 'Escalated' and priority to 'High')
 */
export const escalateReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const reportRef = db.collection('reports').doc(reportId);

        const reportDoc = await reportRef.get();
        if (!reportDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Report not found"
            });
        }

        await reportRef.update({
            status: 'Escalated',
            priority: 'High',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: 'Report escalated successfully',
            reportId
        });
    } catch (error) {
        console.error('Error escalating report:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to delete a report
 * Also deletes associated files from Appwrite Storage
 */
export const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { userId } = req.body;

        const reportRef = db.collection('reports').doc(reportId);

        const reportDoc = await reportRef.get();
        
        if (!reportDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Report not found"
            });
        }

        const reportData = reportDoc.data();

        if (userId && reportData.userId !== userId) {
            return res.status(403).json({
                success: false,
                error: "You don't have permission to delete this report"
            });
        }

        if (reportData.evidence && reportData.evidence.length > 0) {
            const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
            
            for (const evidence of reportData.evidence) {
                try {
                    await storage.deleteFile(BUCKET_ID, evidence.fileId);
                    console.log(`Deleted file from Appwrite: ${evidence.fileId}`);
                } catch (fileError) {
                    console.error('Error deleting file from Appwrite:', fileError);
                }
            }
        }

        await reportRef.delete();

        res.status(200).json({
            success: true,
            message: "Report deleted successfully",
            reportId
        });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Controller to get report statistics
 * Updated to include new statuses
 */
export const getReportStatistics = async (req, res) => {
    try {
        const { LGA } = req.query;

        let query = db.collection('reports');

        if (LGA) {
            query = query.where('LGA', '==', LGA);
        }

        const reportsSnapshot = await query.get();

        const stats = {
            total: reportsSnapshot.size,
            byStatus: {
                'Pending': 0,
                'In Progress': 0,
                'Resolved': 0,
                'Dismissed': 0,
                'Escalated': 0,
                'Police': 0
            },
            byPriority: {
                'Low': 0,
                'Medium': 0,
                'High': 0
            },
            byType: {}
        };

        if (LGA) {
            stats.LGA = LGA;
        }

        reportsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.status) {
                stats.byStatus[data.status] = (stats.byStatus[data.status] || 0) + 1;
            }
            if (data.priority) {
                stats.byPriority[data.priority] = (stats.byPriority[data.priority] || 0) + 1;
            }
            if (data.type) {
                stats.byType[data.type] = (stats.byType[data.type] || 0) + 1;
            }
        });

        res.status(200).json({
            success: true,
            statistics: stats
        });
    } catch (error) {
        console.error('Error getting report statistics:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
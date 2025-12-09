import { db, admin } from "../config/firebase.js";

/**
 * Create a new activity notification (user creates for themselves)
 */
export const createActivity = async (req, res) => {
    try {
        const { message, referenceActivity, isOpen = true } = req.body;
        const { uid } = req.userData;

        if (!message || !referenceActivity) {
            return res.status(400).json({
                success: false,
                error: "Activity 'message' and 'referenceActivity' are required."
            });
        }

        const validReferenceTypes = ['Alert', 'Information', 'Warning'];
        if (!validReferenceTypes.includes(referenceActivity)) {
            return res.status(400).json({
                success: false,
                error: `referenceActivity must be one of: ${validReferenceTypes.join(', ')}`
            });
        }

        console.log(`Creating activity for user: ${uid}, type: ${referenceActivity}`);

        const activityData = {
            message: message.trim(),
            userId: uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            referenceActivity,
            isOpen: Boolean(isOpen)
        };

        const docRef = await db.collection('activities').add(activityData);

        res.status(201).json({
            success: true,
            activityId: docRef.id,
            message: "Activity created successfully"
        });
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Create a new activity notification from admin (specify userId)
 */
export const createActivityFromAdmin = async (req, res) => {
    try {
        const { message, userId, referenceActivity, isOpen = true } = req.body;

        if (!message || !userId || !referenceActivity) {
            return res.status(400).json({
                success: false,
                error: "Activity 'message', 'userId', and 'referenceActivity' are required."
            });
        }

        const validReferenceTypes = ['Alert', 'Information', 'Warning'];
        if (!validReferenceTypes.includes(referenceActivity)) {
            return res.status(400).json({
                success: false,
                error: `referenceActivity must be one of: ${validReferenceTypes.join(', ')}`
            });
        }

        try {
            await admin.auth().getUser(userId);
        } catch (authError) {
            return res.status(404).json({
                success: false,
                error: "Target user not found"
            });
        }

        console.log(`Admin creating activity for user: ${userId}, type: ${referenceActivity}`);

        const activityData = {
            message: message.trim(),
            userId: userId.trim(),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            referenceActivity,
            isOpen: Boolean(isOpen)
        };

        const docRef = await db.collection('activities').add(activityData);

        res.status(201).json({
            success: true,
            activityId: docRef.id,
            userId,
            message: "Activity created successfully"
        });
    } catch (error) {
        console.error('Error creating activity from admin:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Get activities for the authenticated user with optional filters
 */
export const getActivities = async (req, res) => {
    try {
        const { 
            referenceActivity, 
            isOpen,
            limit = 50, 
            orderBy = 'createdAt', 
            order = 'desc' 
        } = req.query;

        const { uid } = req.userData;

        console.log(`Fetching activities for user: ${uid}`);

        let query = db.collection('activities')
            .where('userId', '==', uid);

        // Apply filters
        if (referenceActivity) {
            const validReferenceTypes = ['Alert', 'Information', 'Warning'];
            if (!validReferenceTypes.includes(referenceActivity)) {
                return res.status(400).json({
                    success: false,
                    error: `referenceActivity must be one of: ${validReferenceTypes.join(', ')}`
                });
            }
            query = query.where('referenceActivity', '==', referenceActivity);
        }

        if (isOpen !== undefined) {
            const isOpenBool = isOpen === 'true' || isOpen === true;
            query = query.where('isOpen', '==', isOpenBool);
        }

        // Apply ordering and limit
        query = query.orderBy(orderBy, order).limit(parseInt(limit));

        const snapshot = await query.get();

        const activities = [];
        snapshot.forEach(doc => {
            activities.push({
                activityId: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            success: true,
            count: activities.length,
            activities
        });
    } catch (error) {
        console.error('Error getting activities:', error);
        
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
 * Get a single activity by ID (user can only access their own activities)
 */
export const getActivityById = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { uid } = req.userData;

        if (!activityId) {
            return res.status(400).json({
                success: false,
                error: "Activity ID is required"
            });
        }

        const activityDoc = await db
            .collection('activities')
            .doc(activityId)
            .get();

        if (!activityDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Activity not found"
            });
        }

        // Check if user owns this activity
        const activityData = activityDoc.data();
        if (activityData.userId !== uid) {
            return res.status(403).json({
                success: false,
                error: "Access denied: You can only access your own activities"
            });
        }

        res.status(200).json({
            success: true,
            activity: {
                activityId: activityDoc.id,
                ...activityData
            }
        });
    } catch (error) {
        console.error('Error getting activity by ID:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Update activity status (mark as read/unread)
 */
export const updateActivityStatus = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { isOpen } = req.body;

        if (isOpen === undefined) {
            return res.status(400).json({
                success: false,
                error: "isOpen field is required (true or false)"
            });
        }

        const activityRef = db.collection('activities').doc(activityId);
        const activityDoc = await activityRef.get();

        if (!activityDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Activity not found"
            });
        }

        // Optional: Verify user owns this activity
        const activityData = activityDoc.data();
        if (activityData.userId !== req.userData?.uid) {
            return res.status(403).json({
                success: false,
                error: "Access denied"
            });
        }

        await activityRef.update({
            isOpen: Boolean(isOpen),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).json({
            success: true,
            message: `Activity marked as ${isOpen ? 'open' : 'closed'}`,
            activityId
        });
    } catch (error) {
        console.error('Error updating activity status:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Mark all activities as read for a user
 */
export const markAllAsRead = async (req, res) => {
    try {
        const { uid } = req.userData;

        const activitiesSnapshot = await db
            .collection('activities')
            .where('userId', '==', uid)
            .where('isOpen', '==', true)
            .get();

        const batch = db.batch();
        
        activitiesSnapshot.forEach(doc => {
            batch.update(doc.ref, {
                isOpen: false,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });

        await batch.commit();

        res.status(200).json({
            success: true,
            message: `${activitiesSnapshot.size} activities marked as read`,
            count: activitiesSnapshot.size
        });
    } catch (error) {
        console.error('Error marking all activities as read:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Delete an activity
 */
export const deleteActivity = async (req, res) => {
    try {
        const { activityId } = req.params;

        const activityRef = db.collection('activities').doc(activityId);
        const activityDoc = await activityRef.get();

        if (!activityDoc.exists) {
            return res.status(404).json({
                success: false,
                error: "Activity not found"
            });
        }

        // Optional: Verify user owns this activity
        const activityData = activityDoc.data();
        if (activityData.userId !== req.userData?.uid) {
            return res.status(403).json({
                success: false,
                error: "Access denied"
            });
        }

        await activityRef.delete();

        res.status(200).json({
            success: true,
            message: "Activity deleted successfully",
            activityId
        });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/**
 * Delete all activities for a user (with optional filters)
 */
export const deleteAllActivities = async (req, res) => {
    try {
        const { uid } = req.userData;
        const { referenceActivity, isOpen } = req.query;

        let query = db.collection('activities')
            .where('userId', '==', uid);

        if (referenceActivity) {
            query = query.where('referenceActivity', '==', referenceActivity);
        }

        if (isOpen !== undefined) {
            const isOpenBool = isOpen === 'true' || isOpen === true;
            query = query.where('isOpen', '==', isOpenBool);
        }

        const activitiesSnapshot = await query.get();

        const batch = db.batch();
        
        activitiesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        res.status(200).json({
            success: true,
            message: `${activitiesSnapshot.size} activities deleted successfully`,
            count: activitiesSnapshot.size
        });
    } catch (error) {
        console.error('Error deleting all activities:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
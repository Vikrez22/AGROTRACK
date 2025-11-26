import { db, admin } from "../config/firebase.js";


export const sendMessage = async (req, res) => {
    try {

        const { message }  = req.body
        const { role, uid, LGA, displayName } = req.userData

        console.log("we reached here", message)

        const docRef = await db
            .collection('lgas')
            .doc(LGA)
            .collection('chatMessages')
            .add({
                userId: uid,
                displayName: displayName,
                role,
                message: message.trim(),
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: new Date().toISOString()
            });


        res.status(201).json({ 
            success: true, 
            messageId: docRef.id,
            LGA 
        });

    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ 
        success: false, 
        error: error.message 
        });

 }

}

export const getUserUnreadCount = async (req, res) => {
    try {
        const { uid, LGA } = req.userData;

        // Get all messages in the user's LGA
        const messagesSnapshot = await db
            .collection('lgas')
            .doc(LGA)
            .collection('chatMessages')
            .orderBy('timestamp', 'desc')
            .limit(100) // Limit to last 100 messages for performance
            .get();

        let unreadCount = 0;

        // Check each message to see if user has read it
        for (const messageDoc of messagesSnapshot.docs) {
            const messageData = messageDoc.data();
            
            // Skip own messages
            if (messageData.userId === uid) {
                continue;
            }

            // Check if user has read this message
            const readDoc = await db
                .collection('lgas')
                .doc(LGA)
                .collection('chatMessages')
                .doc(messageDoc.id)
                .collection('reads')
                .doc(uid)
                .get();

            if (!readDoc.exists) {
                unreadCount++;
            }
        }

        res.status(200).json({
            success: true,
            unreadCount,
            totalMessages: messagesSnapshot.size
        });
    } catch (error) {
        console.error('Error getting unread count:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
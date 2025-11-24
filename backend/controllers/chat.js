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
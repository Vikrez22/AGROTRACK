import { storage } from "../config/appwrite.js";
import { admin, db } from "../config/firebase.js";
import { ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';


export const createAnonymousReport = async (req, res) => {
    try {
        const { 
            type, 
            location, 
            description,
            displayName, 
            LGA, 
            phoneNumber 
        } = req.body;
        const files = req.files; 

        if (!type || !location) {
            return res.status(400).json({
                success: false,
                error: "Report 'type' and 'location' are required."
            });
        }

        if (!displayName || !LGA || !phoneNumber) {
            return res.status(400).json({
                success: false,
                error: "Display name, LGA, and phone number are required for anonymous reports."
            });
        }

        console.log(`Attempting to create anonymous report for LGA: ${LGA}`);

        // Upload files to Appwrite Storage if any exist
        const evidenceUrls = [];
        if (files && files.length > 0) {
            const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

            for (const file of files) {
                try {
                    // Create a unique file ID
                    const fileId = ID.unique();
                    
                    // Upload to Appwrite Storage
                    const uploadedFile = await storage.createFile(
                        BUCKET_ID,
                        fileId,
                        InputFile.fromBuffer(file.buffer, file.originalname)
                    );

                    // Get file view URL
                    const fileUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

                    evidenceUrls.push({
                        fileId: uploadedFile.$id,
                        url: fileUrl,
                        filename: file.originalname,
                        contentType: file.mimetype,
                        size: file.size,
                        uploadedAt: new Date().toISOString() 
                    });

                    console.log(`File uploaded: ${file.originalname} (ID: ${uploadedFile.$id})`);
                } catch (uploadError) {
                    console.error('Error uploading file to Appwrite:', uploadError);
                }
            }
        }

        const reportData = {
            displayName: displayName.trim(),
            userId: null, 
            isAnonymous: true, 
            type: type.trim(),
            location: location.trim(),
            description: description ? description.trim() : '', 
            phoneNumber: phoneNumber.trim(),
            LGA: LGA.trim(),
            evidence: evidenceUrls,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'Pending',
            priority: 'Medium',
        };

        const docRef = await db.collection('reports').add(reportData);

        res.status(201).json({
            success: true,
            message: "Anonymous report created successfully",
            reportId: docRef.id,
            LGA: reportData.LGA,
            evidenceCount: evidenceUrls.length
        });
    } catch (error) {
        console.error('Error creating anonymous report:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
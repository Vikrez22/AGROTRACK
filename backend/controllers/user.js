import { db, admin } from '../config/firebase.js';

const VALID_ROLES = ['farmer', 'herder', 'admin'];

export const createUserProfile = async (req, res) => {
  try {
    const { email, displayName, phoneNumber, state, LGA, role } = req.body;
    const { uid } = req.userData


    console.log('Creating user profile with data:', req.body);

    if (!uid || !email || !role) {
      return res.status(400).json({ 
        message: 'Missing required fields: uid, email, and role are required' 
      });
    }

    if (!displayName || !phoneNumber || !state || !LGA) {
      return res.status(400).json({ 
        message: 'Missing required fields: displayName, phoneNumber, state, and lga are required' 
      });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ 
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` 
      });
    }

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return res.status(409).json({ 
        message: 'User profile already exists',
        profile: userDoc.data()
      });
    }

    const userProfile = {
      uid,
      email,
      displayName,
      phoneNumber,
      state,
      LGA,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(userProfile);

    return res.status(201).json({
      message: 'User profile created successfully',
      profile: userProfile,
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return res.status(500).json({ 
      message: 'Error creating user profile',
      error: error.message 
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {

    const { uid } = req.userData


    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    console.log('User profile data:', userDoc.data());

    return res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ 
      message: 'Error fetching user profile',
      error: error.message 
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {

    const { uid } = req.userData

    const updates = req.body;

    // Prevent updating certain fields
    delete updates.uid;
    delete updates.createdAt;

    if (updates.role && !VALID_ROLES.includes(updates.role)) {
      return res.status(400).json({ 
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` 
      });
    }

    updates.updatedAt = new Date().toISOString();

    const userRef = db.collection('users').doc(uid);
    await userRef.update(updates);

    const updatedDoc = await userRef.get();

    return res.status(200).json({
      message: 'User profile updated successfully',
      profile: updatedDoc.data(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ 
      message: 'Error updating user profile',
      error: error.message 
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    
    let query = db.collection('users');
    
    // Filter by role if provided, but exclude admins
    if (role && VALID_ROLES.includes(role)) {
      if (role === 'admin') {
        // Don't allow querying for admin users
        return res.status(403).json({ 
          message: 'Cannot query admin users',
          count: 0,
          users: []
        });
      }
      query = query.where('role', '==', role);
    } else {
      // If no specific role requested, exclude admin users
      query = query.where('role', 'in', ['farmer', 'herder']);
    }

    const snapshot = await query.get();
    const users = [];

    snapshot.forEach(doc => {
      const userData = doc.data();
      // Extra safety check: filter out any admin users
      if (userData.role !== 'admin') {
        users.push(userData);
      }
    });

    return res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;

    // Check if the user exists and get their data first
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ 
        message: 'User profile not found' 
      });
    }

    const userData = userDoc.data();

    // Prevent deletion of admin users
    if (userData.role === 'admin') {
      return res.status(403).json({ 
        message: 'Cannot delete admin users' 
      });
    }

    // Delete from Firebase Authentication first
    try {
      await admin.auth().deleteUser(uid);
      console.log('Successfully deleted user from Firebase Authentication:', uid);
    } catch (authError) {
      console.error('Error deleting user from Authentication:', authError);
      // If user doesn't exist in Auth, we can still proceed to delete from Firestore
      if (authError.code !== 'auth/user-not-found') {
        throw authError;
      }
    }

    // Delete from Firestore database
    await userRef.delete();

    return res.status(200).json({
      message: 'User profile deleted successfully from both Authentication and Database',
    });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return res.status(500).json({ 
      message: 'Error deleting user profile',
      error: error.message 
    });
  }
};
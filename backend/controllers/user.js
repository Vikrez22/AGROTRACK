import { db } from '../config/firebase.js';

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
      return res.status(200).json({ 
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
    
    if (role && VALID_ROLES.includes(role)) {
      query = query.where('role', '==', role);
    }

    const snapshot = await query.get();
    const users = [];

    snapshot.forEach(doc => {
      users.push(doc.data());
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

    await db.collection('users').doc(uid).delete();

    return res.status(200).json({
      message: 'User profile deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return res.status(500).json({ 
      message: 'Error deleting user profile',
      error: error.message 
    });
  }
};
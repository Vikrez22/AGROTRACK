import { auth, db } from "../config/firebase.js"


export const authenticateUser = async (req, res, next ) => {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next()
    } catch (error) {
        console.error('Token verification error:', error)
        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }

}

export const requireRole = (...allowedRoles) => {
    return async (req, res, next) => {
      try {
        const { db } = require('../config/firebase');

        const userDoc = await db.collection('users').doc(req.user.uid).get();
        
        if (!userDoc.exists) {
          return res.status(403).json({ message: 'User profile not found' });
        }
  
        const userData = userDoc.data();
        
        if (!allowedRoles.includes(userData?.role)) {
          return res.status(403).json({ 
            message: 'Insufficient permissions',
            required: allowedRoles,
            current: userData?.role
          });
        }
  
        req.userProfile = userData;
        next();
      } catch (error) {
        console.error('Role verification error:', error);
        return res.status(500).json({ message: 'Error verifying role' });
      }
    };
  };
  

export const getProfile = async (req, res, next) => {
    try
    {
      const decodedToken = req.user

    if (!decodedToken) {
      return (
        res.status(401).json({message: 'decodedToken not provided'})
      )
    }

    const userDoc = await db.collection('users').doc(req.user.uid).get()

    if (!userDoc.exists) {
      return (
        res.status(403).json({message: "User profile doesn't exist"})
      )
    }

    const userData = userDoc.data()

    req.userData = userData
    next()
  } catch (error){
    console.error('getProfile failed', error)
    return res.status(500).json({ message: 'Error getting user data' });

  }
}
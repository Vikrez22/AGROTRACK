// hooks/usePresence.js
import { useEffect } from 'react';
import { ref, onValue, set, onDisconnect, serverTimestamp } from 'firebase/database';
import { useAuth } from '../../context/AuthContext';
import { dbRT } from '../../config/firebase';


export function usePresence() {
  const { profile: user } = useAuth();

  useEffect(() => {
    if (!user?.uid || !user?.LGA) return;

    const userStatusRef = ref(dbRT, `lgaPresence/${user.LGA}/${user.uid}`);
    const connectedRef = ref(dbRT, '.info/connected');

    // Listen to connection state
    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        // User is online
        const presenceData = {
          status: 'online',
          lastSeen: serverTimestamp(),
          displayName: user.displayName || 'Anonymous',
          role: user.role || 'user'
        };

        // Set user as online
        set(userStatusRef, presenceData);

        // When user disconnects, update status
        onDisconnect(userStatusRef).set({
          status: 'offline',
          lastSeen: serverTimestamp(),
          displayName: user.displayName || 'Anonymous',
          role: user.role || 'user'
        });
      }
    });

    return () => {
      // Clean up on unmount
      set(userStatusRef, {
        status: 'offline',
        lastSeen: serverTimestamp(),
        displayName: user.displayName || 'Anonymous',
        role: user.role || 'user'
      });
      unsubscribe();
    };
  }, [user?.uid, user?.LGA]);
}
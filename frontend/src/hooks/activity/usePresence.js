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

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        const presenceData = {
          status: 'online',
          lastSeen: serverTimestamp(),
          displayName: user.displayName || 'Anonymous',
          role: user.role || 'user'
        };

        set(userStatusRef, presenceData);

        onDisconnect(userStatusRef).set({
          status: 'offline',
          lastSeen: serverTimestamp(),
          displayName: user.displayName || 'Anonymous',
          role: user.role || 'user'
        });
      }
    });

    return () => {
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
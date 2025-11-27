import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { dbRT } from '../../config/firebase';

export function useOnlineUsers(lgaId) {
  const [onlineCount, setOnlineCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!lgaId) return;

    const presenceRef = ref(dbRT, `lgaPresence/${lgaId}`);

    const unsubscribe = onValue(
      presenceRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setOnlineCount(0);
          setOnlineUsers([]);
          return;
        }

        const users = Object.entries(data)
          .filter(([_, userData]) => userData?.status === 'online')
          .map(([uid, userData]) => ({
            uid,
            ...userData
          }));

        setOnlineCount(users.length);
        setOnlineUsers(users);
      },
      (error) => {
        console.error('Firebase read error:', error);
      }
    );

    return () => unsubscribe();
  }, [lgaId]);

  return { onlineCount, onlineUsers };
}

// hooks/useOnlineUsers.js
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { dbRT } from '../../config/firebase';

export function useOnlineUsers(lgaId) {
  const [onlineCount, setOnlineCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Debug: Check if lgaId exists
    console.log('🔍 lgaId received:', lgaId);
    
    if (!lgaId) {
      console.log('❌ No lgaId provided, skipping subscription');
      return;
    }

    const presenceRef = ref(dbRT, `lgaPresence/${lgaId}`);
    console.log('📍 Listening to path:', `lgaPresence/${lgaId}`);

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      console.log('📊 Snapshot exists:', snapshot.exists());
      console.log('📊 Raw snapshot data:', snapshot.val());
      
      const data = snapshot.val();
      
      if (!data) {
        console.log('⚠️ No data at this path');
        setOnlineCount(0);
        setOnlineUsers([]);
        return;
      }

      console.log('✅ Data structure:', JSON.stringify(data, null, 2));

      const users = Object.entries(data)
        .filter(([_, userData]) => {
          console.log('Checking user:', userData, 'Status:', userData?.status);
          return userData?.status === 'online';
        })
        .map(([uid, userData]) => ({
          uid,
          ...userData
        }));

      console.log('👥 Filtered online users:', users);
      setOnlineCount(users.length);
      setOnlineUsers(users);
    }, (error) => {
      // Add error handler
      console.error('❌ Firebase read error:', error);
    });

    return () => unsubscribe();
  }, [lgaId]);

  console.log('📈 Current online count:', onlineCount);

  return { onlineCount, onlineUsers };
}
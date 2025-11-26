import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  onSnapshot,
  query,
  writeBatch,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const useMessageReads = (chatMessages, userLGA, userId) => {
  const [readStatus, setReadStatus] = useState({}); // messageId -> { readBy: Set, readCount: number }
  const [unreadCount, setUnreadCount] = useState(0);

  // Subscribe to read status for all messages
  useEffect(() => {
    if (!userLGA || chatMessages.length === 0) return;

    const unsubscribers = [];

    chatMessages.forEach((msg) => {
      const readsQuery = query(
        collection(db, "lgas", userLGA, "chatMessages", msg.id, "reads")
      );

      const unsubscribe = onSnapshot(readsQuery, (snapshot) => {
        const readBy = new Set();
        snapshot.docs.forEach((doc) => {
          readBy.add(doc.id); // doc.id is the userId
        });

        setReadStatus((prev) => ({
          ...prev,
          [msg.id]: {
            readBy,
            readCount: readBy.size,
          },
        }));
      });

      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [userLGA, chatMessages]);

  // Calculate unread count
  useEffect(() => {
    if (!userId) return;

    const unread = chatMessages.filter((msg) => {
      // Don't count own messages as unread
      if (msg.userId === userId) return false;

      const status = readStatus[msg.id];
      return !status?.readBy.has(userId);
    }).length;

    setUnreadCount(unread);
  }, [chatMessages, readStatus, userId]);

  const markMessagesAsRead = async (messageIds) => {
    if (!userId || !userLGA) return;

    try {
      const batch = writeBatch(db);

      messageIds.forEach((messageId) => {
        const status = readStatus[messageId];

        // Only mark if not already read
        if (!status?.readBy.has(userId)) {
          const readDocRef = doc(
            db,
            "lgas",
            userLGA,
            "chatMessages",
            messageId,
            "reads",
            userId
          );

          batch.set(readDocRef, {
            readAt: serverTimestamp(),
            userId: userId,
          });
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadMessageIds = chatMessages
      .filter((msg) => {
        if (msg.userId === userId) return false;
        const status = readStatus[msg.id];
        return !status?.readBy.has(userId);
      })
      .map((msg) => msg.id);

    if (unreadMessageIds.length > 0) {
      await markMessagesAsRead(unreadMessageIds);
    }
  };

  const isMessageRead = (messageId) => {
    const status = readStatus[messageId];
    return status?.readBy.has(userId);
  };

  const getReadCount = (messageId) => {
    return readStatus[messageId]?.readCount || 0;
  };

  return {
    readStatus,
    unreadCount,
    markMessagesAsRead,
    markAllAsRead,
    isMessageRead,
    getReadCount,
  };
};


import React from "react";
import { Users } from "lucide-react";
import ChatBox from "../../Cowtracking/ChatBox";
import { useAuth } from "../../../context/AuthContext";
const Chat = () => {
  const { role, profile } = useAuth();

  const userId = profile?.uid;
  const LGA = profile?.LGA;

  console.log("data from farmer chat", profile.displayName);

  return (
    <div className="space-y-6 m-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Community Communication</h2>
        <p className="text-gray-600 mb-6">
          Connect with herders and other farmers in your area for better
          coordination.
        </p>
      </div>
      <div className="min-h-[400px]">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-green-600" size={24} />
            <h3 className="text-xl font-semibold">Community Chat</h3>
          </div>
          <div className="flex-1 min-h-0">
            <ChatBox
              userId={userId}
              role={role}
              userLGA={LGA}
              userProfile={profile.displayName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;

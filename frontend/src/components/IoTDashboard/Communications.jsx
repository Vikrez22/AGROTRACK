import { Users } from "lucide-react";
import ChatBox from "../Cowtracking/ChatBox";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const Communications = () => {

  const { role, profile } = useAuth();

  const userId = profile?.uid;
  const LGA = profile?.LGA;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Command Center Communications
        </h2>
        <p className="text-gray-600 mb-6">
          Coordinate with patrol units, farmers, herders, and other stakeholders
          for effective conflict prevention.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-green-600" size={24} />
          <h3 className="text-xl font-semibold">Community Chat</h3>
        </div>
        <div className="flex-1 min-h-0">
          <ChatBox userId={userId} role={role} userLGA={LGA} />

        </div>
      </div>
    </div>
  );
};
export default Communications;

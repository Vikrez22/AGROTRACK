import React from "react";
import GeoTracker from "../Cowtracking/GeoTracker";
import ChatBox from "../Cowtracking/ChatBox";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import "./FarmerDashboard.css"; //css fire

const FarmerDashboard = () => {
  const userId = "farmer-1";

  return (
    <div className="farmer-dashboard">
      <div className="farmer-header">
        <h2>Welcome to the Farmer Dashboard</h2>
        <p>View Grazing and Non-Grazing Areas</p>
      </div>

      <div className="farmer-main">
        <GeoTracker userRole="farmer" />

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <AgroTrackChatBot />
          </div>
          <div style={{ flex: 1 }}>
            <ChatBox userId={userId} role="farmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

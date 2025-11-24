import React from "react";
import { Map, MapPin, MessageSquare, Tractor } from "lucide-react";
import GeoTracker from "../../Cowtracking/GeoTracker";
import { useAuth } from "../../../context/AuthContext";

const Overview = () => {

  const { role } = useAuth()

 

  const userRole = role;
  
  return (
    <div className="space-y-6 m-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Active Alerts</h3>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <MapPin size={48} className="opacity-80" />
          </div>
          <p className="text-sm mt-2 opacity-90">
            Livestock near restricted areas
          </p>
        </div>

        <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Grazing Areas</h3>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>
            <Tractor size={48} className="opacity-80" />
          </div>
          <p className="text-sm mt-2 opacity-90">Designated safe zones</p>
        </div>

        <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Messages</h3>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <MessageSquare size={48} className="opacity-80" />
          </div>
          <p className="text-sm mt-2 opacity-90">Community updates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geo Tracker */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Map className="text-green-600" size={24} />
            <h3 className="text-xl font-semibold">
              Livestock Tracking & Geo-fencing
            </h3>
          </div>
          <div className="rounded-lg overflow-hidden border">
            <GeoTracker userRole={userRole} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Livestock detected in sector 7
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    New grazing area approved
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Message from herder in your area
                  </p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;

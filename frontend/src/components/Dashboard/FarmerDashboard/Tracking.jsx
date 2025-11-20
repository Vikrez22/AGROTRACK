import { Map } from "lucide-react";
import GeoTracker from "../../Cowtracking/GeoTracker";
const Tracking = () => {
  const userRole = "farmer";
  return (
    <div className="space-y-6 m-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Livestock Tracking & Geo-fencing
        </h2>
        <p className="text-gray-600 mb-6">
          Monitor livestock movements and manage grazing areas to prevent
          conflicts.
        </p>
      </div>

      {/* GeoTracker */}
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
    </div>
  );
};
export default Tracking;

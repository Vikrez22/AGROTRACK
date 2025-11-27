import { Map, Plus } from "lucide-react";
import GeoTracker from "../../Cowtracking/GeoTracker";
const Tracking = () => {
  const userRole = "farmer";
  return (
    <div className="space-y-6 m-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Mapping & Geo-fencing</h2>
        <p className="text-gray-600 mb-6">
          Monitor your maps and manage grazing areas to prevent conflicts.
        </p>
      </div>

      <div className="flex gap-6">
        <div>
          <div className="border w-65 h-43"></div>
          <p>Map Name</p>
          <p>Date created: 11/26/2025</p>
        </div>

        <div
          className="flex items-center justify-center size-15 rounded-full border"
          title="fence a new area"
        >
          <Plus size={22} />
        </div>
      </div>

      {/* GeoTracker */}
      {/* <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="text-green-600" size={24} />
          <h3 className="text-xl font-semibold">
            Livestock Tracking & Geo-fencing
          </h3>
        </div>
        <div className="rounded-lg overflow-hidden border">
          <GeoTracker userRole={userRole} />
        </div>
      </div> */}
    </div>
  );
};
export default Tracking;

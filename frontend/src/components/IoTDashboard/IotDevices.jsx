import { Users } from "lucide-react";

const IotDevices = (props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">IoT Device Management</h2>
        <p className="text-gray-600 mb-6">
          Monitor device status, battery levels, and connectivity for all
          deployed livestock trackers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {props.animalMarkers.map((device) => (
            <div
              key={device.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{device.name}</h3>
                  <p className="text-sm text-gray-600">ID: {device.id}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  📍<strong>Last Known Position:</strong>{" "}
                  {device.data.latitude?.toFixed(6)},{" "}
                  {device.data.longitude?.toFixed(6)}
                </p>
                <p>
                  🏃<strong>Speed:</strong> {device.data.speed_kmph || "N/A"}{" "}
                  km/h
                </p>
                <p>
                  🧭<strong>Course:</strong> {device.data.course || "N/A"}°
                </p>
                <p>
                  🛰️<strong>Satellites:</strong>{" "}
                  {device.data.satellites || "N/A"}
                </p>
                <p>
                  🏔️<strong>Altitude:</strong> {device.data.altitude || "N/A"}
                </p>
                {/* <p><strong>Date:</strong> {device.data.date || 'N/A'}</p> */}
                <p>
                  🔋<strong>Battery:</strong> {device.data.battery || "N/A"}%
                </p>
                <p>
                  ⚡<strong>Status:</strong>{" "}
                  {device.isInRestrictedArea ? (
                    <span className="text-red-600 font-bold">
                      In Restricted Area
                    </span>
                  ) : (
                    <span className="text-green-600">Normal</span>
                  )}
                </p>
                <p>
                  ⏲️<strong>Last Update:</strong> {device.data.time || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default IotDevices;

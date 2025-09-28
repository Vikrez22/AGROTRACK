import React, { useState, useEffect, useRef, useCallback } from "react";
import AgroTrackChatBot from "../Cowtracking/AgroTrackChatBot";
import ChatBox from "../Cowtracking/ChatBox";
import {
  MessageSquare,
  Bot,
  Menu,
  X,
  Shield,
  Users,
  AlertTriangle,
  Activity,
  Wifi,
  Eye,
  Bell,
  Settings,
  Radio,
  Car,
  FileText,
  Clock,
  Phone,
  Mail,
  Smartphone,
  Zap,
  Lock,
  Plus,
  User,
} from "lucide-react";

// Import Leaflet components
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

// Firebase imports for Realtime Database
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

//Sidebar image
import sideBarLogo from "../../assets/sidebar_logo_white.png";

const iotFirebaseConfig = {
  apiKey: "AIzaSyDaw8OdK1eaMCcOJgB6lHDFGn_hb9YIEdM",
  authDomain: "agrorithm-f4d87.firebaseapp.com",
  databaseURL: "https://agrorithm-f4d87-default-rtdb.firebaseio.com",
  projectId: "agrorithm-f4d87",
  storageBucket: "agrorithm-f4d87.firebasestorage.app",
  messagingSenderId: "1084500546652",
  appId: "1:1084500546652:web:c2a251d9585f7211448299",
};

const iotApp = initializeApp(iotFirebaseConfig, "iot-app");
const iotDb = getDatabase(iotApp);

// Fix Leaflet default markers
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

// Custom cow marker icon
const cowIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="14" fill="#8B4513" stroke="#654321" stroke-width="2"/>
      <circle cx="16" cy="16" r="10" fill="#A0522D"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold">🐄</text>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Alarm icon for restricted areas
const alarmIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="14" fill="#FF0000" stroke="#CC0000" stroke-width="2"/>
      <polygon points="16,6 12,22 20,22" fill="white"/>
      <circle cx="16" cy="26" r="2" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// Draw Control Component (for admin/farmer roles)
// Draw Control Component with improved synchronization
const DrawControl = ({ onCreated, onDeleted, drawType }) => {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());
  const drawControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Only add if not already added
    if (!map.hasLayer(drawnItemsRef.current)) {
      map.addLayer(drawnItemsRef.current);
    }

    // Remove existing control if it exists
    if (drawControlRef.current) {
      map.removeControl(drawControlRef.current);
    }

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          shapeOptions: {
            color: drawType === "grazing" ? "#2e8b57" : "#ff0000",
            fillColor: drawType === "grazing" ? "#2e8b57" : "#ff0000",
            fillOpacity: 0.3,
            weight: 2,
          },
          allowIntersection: false,
          drawError: {
            color: "#e1e100",
            message: "<strong>Error:</strong> Shape edges cannot cross!",
          },
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItemsRef.current,
        remove: true,
        edit: true,
      },
    });

    drawControlRef.current = drawControl;
    map.addControl(drawControl);

    const handleCreated = (e) => {
      const layer = e.layer;

      // Add a unique ID to the layer for tracking
      layer._agrotrackId = `temp_${Date.now()}`;
      drawnItemsRef.current.addLayer(layer);

      const latlngs = layer.getLatLngs()[0].map((latlng) => ({
        lat: parseFloat(latlng.lat.toFixed(6)),
        lng: parseFloat(latlng.lng.toFixed(6)),
      }));

      onCreated(latlngs, drawType);
    };

    const handleDeleted = (e) => {
      e.layers.eachLayer((layer) => {
        onDeleted(layer);
      });
    };

    const handleEdited = (e) => {
      e.layers.eachLayer((layer) => {
        const latlngs = layer.getLatLngs()[0].map((latlng) => ({
          lat: parseFloat(latlng.lat.toFixed(6)),
          lng: parseFloat(latlng.lng.toFixed(6)),
        }));

        // Trigger update - you may want to add an onEdited callback
        console.log("Area edited:", latlngs);
      });
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.DELETED, handleDeleted);
    map.on(L.Draw.Event.EDITED, handleEdited);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.DELETED, handleDeleted);
      map.off(L.Draw.Event.EDITED, handleEdited);

      if (drawControlRef.current) {
        try {
          map.removeControl(drawControlRef.current);
        } catch (e) {
          // Control may have already been removed
          console.warn("Control removal error:", e);
        }
      }
    };
  }, [map, onCreated, onDeleted, drawType]);

  return null;
};

// Real Map Component with Leaflet
const LiveTrackingMap = ({
  center,
  markers,
  grazingAreas,
  nonGrazingAreas,
  userRole,
  onCreated,
  onDeleted,
  drawType,
}) => (
  <MapContainer
    center={center}
    zoom={13}
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; OpenStreetMap contributors"
    />

    {/* Animal Markers */}
    {markers.map((animal) => (
      <Marker
        key={animal.id}
        position={animal.position}
        icon={animal.isInRestrictedArea ? alarmIcon : cowIcon}
      >
        <Popup>
          <div className="p-2 text-gray-800">
            <h4 className="font-bold text-lg mb-2">
              {animal.name || `Animal ${animal.id}`}
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Coordinates:</strong> {animal.data.latitude?.toFixed(6)}
                , {animal.data.longitude?.toFixed(6)}
              </p>
              <p>
                <strong>Altitude:</strong> {animal.data.altitude}m
              </p>
              <p>
                <strong>Speed:</strong> {animal.data.speed_kmph} km/h
              </p>
              <p>
                <strong>Course:</strong> {animal.data.course}°
              </p>
              <p>
                {/* <strong>Satellites:</strong> {animal.data.satellites} */}
              </p>
              <p>{/* <strong>Date:</strong> {animal.data.date} */}</p>
              <p>
                <strong>Time:</strong> {animal.data.time}
              </p>
              {animal.isInRestrictedArea && (
                <p className="text-red-600 font-bold mt-2">
                  ⚠️ IN RESTRICTED AREA!
                </p>
              )}
            </div>
          </div>
        </Popup>
      </Marker>
    ))}

    {/* Grazing Areas Polygons */}
    {grazingAreas.map(({ id, coords }) => (
      <Polygon
        key={id}
        positions={coords.map((pt) => [pt.lat, pt.lng])}
        pathOptions={{
          color: "#2e8b57",
          fillColor: "#2e8b57",
          fillOpacity: 0.3,
          weight: 2,
        }}
      >
        <Popup>Grazing Area</Popup>
      </Polygon>
    ))}

    {/* Non-Grazing Areas Polygons */}
    {nonGrazingAreas.map(({ id, coords }) => (
      <Polygon
        key={id}
        positions={coords.map((pt) => [pt.lat, pt.lng])}
        pathOptions={{
          color: "red",
          fillColor: "red",
          fillOpacity: 0.3,
          weight: 2,
        }}
      >
        <Popup>Restricted Area</Popup>
      </Polygon>
    ))}

    {/* Draw Controls - only for admin/farmer roles */}
    {(userRole === "law-enforcement" || userRole === "farmer") && (
      <DrawControl
        drawType={drawType}
        onCreated={onCreated}
        onDeleted={onDeleted}
      />
    )}
  </MapContainer>
);

const IoTLivestockDashboard = ({ userRole = "law-enforcement" }) => {
  const [livestockData, setLivestockData] = useState({});
  const [grazingAreas, setGrazingAreas] = useState([]);
  const [nonGrazingAreas, setNonGrazingAreas] = useState([]);
  const [drawType, setDrawType] = useState("grazing");
  const [alarms, setAlarms] = useState([]);
  const [messageBox, setMessageBox] = useState({
    visible: false,
    message: "",
    type: "",
  });

  const showMessageBox = (message, type) => {
    setMessageBox({ visible: true, message, type });
    setTimeout(
      () => setMessageBox({ visible: false, message: "", type: "" }),
      5000
    );
  };

  const playAlarmSound = useCallback(() => {
    if (typeof Audio !== "undefined") {
      try {
        const audio = new Audio("/agrorithm_alarm.mp3");
        audio.volume = 0.7;
        audio
          .play()
          .then(() => console.log("Alarm sound played successfully."))
          .catch((e) => {
            console.error("Error playing alarm sound:", e);
            showMessageBox(
              "Alarm sound blocked by browser (autoplay policy). Please click anywhere on the page to enable sound.",
              "warning"
            );
          });
      } catch (e) {
        console.error("Failed to create Audio object:", e);
        showMessageBox(
          "Audio playback not supported or file not found.",
          "error"
        );
      }
    } else {
      console.log("Audio notification not available in this environment.");
    }
  }, []);

  const isPointInPolygon = useCallback((point, polygon) => {
    const x = point.lat,
      y = point.lng;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat,
        yi = polygon[i].lng;
      const xj = polygon[j].lat,
        yj = polygon[j].lng;

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }, []);

  const checkGeofencing = useCallback(
    (animalId, position) => {
      let isViolating = false;
      for (const area of nonGrazingAreas) {
        if (isPointInPolygon(position, area.coords)) {
          isViolating = true;
          const alarmExists = alarms.some(
            (alarm) =>
              alarm.animalId === animalId &&
              alarm.type === "RESTRICTED_AREA_VIOLATION"
          );
          if (!alarmExists) {
            const alarmId = `${animalId}_${Date.now()}`;
            const newAlarm = {
              id: alarmId,
              animalId,
              position,
              timestamp: new Date().toISOString(),
              type: "RESTRICTED_AREA_VIOLATION",
              message: `Animal ${animalId} entered restricted area!`,
            };
            setAlarms((prev) => [...prev, newAlarm]);
            playAlarmSound();
            showMessageBox(
              `Alert: Animal ${animalId} entered restricted area!`,
              "error"
            );
          }
          break;
        }
      }
      if (!isViolating) {
        setAlarms((prev) =>
          prev.filter(
            (alarm) =>
              !(
                alarm.animalId === animalId &&
                alarm.type === "RESTRICTED_AREA_VIOLATION"
              )
          )
        );
      }
    },
    [nonGrazingAreas, alarms, isPointInPolygon, playAlarmSound]
  );

  // Effect to listen to IoT livestock data from Firebase
  useEffect(() => {
    const livestockRef = ref(iotDb, "/");
    const unsubscribe = onValue(
      livestockRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setLivestockData(data);

          Object.keys(data).forEach((key) => {
            if (
              key === "latest_position" &&
              data[key]?.latitude &&
              data[key]?.longitude
            ) {
              const position = {
                lat: data[key].latitude,
                lng: data[key].longitude,
              };
              checkGeofencing("main_device", position);
            } else if (
              key.startsWith("offline_") &&
              data[key]?.latest_position?.latitude &&
              data[key]?.latest_position?.longitude
            ) {
              const position = {
                lat: data[key].latest_position.latitude,
                lng: data[key].latest_position.longitude,
              };
              checkGeofencing(key, position);
            }
          });
        } else {
          setLivestockData({});
          setAlarms([]);
        }
      },
      (error) => {
        console.error("Error fetching livestock data from Firebase:", error);
        showMessageBox(
          `Failed to load livestock data: ${error.message}`,
          "error"
        );
      }
    );

    return () => unsubscribe();
  }, [checkGeofencing]);

  // Effect to listen to geofencing areas from Firebase
  useEffect(() => {
    const areasRef = ref(iotDb, "geofencing_areas");
    const unsubscribe = onValue(
      areasRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const areas = snapshot.val();
          const grazing = [],
            nonGrazing = [];

          Object.keys(areas).forEach((areaId) => {
            const area = areas[areaId];
            if (area.type === "grazing") {
              grazing.push({ id: areaId, coords: area.coordinates });
            } else if (area.type === "non-grazing") {
              nonGrazing.push({ id: areaId, coords: area.coordinates });
            }
          });

          setGrazingAreas(grazing);
          setNonGrazingAreas(nonGrazing);
        } else {
          setGrazingAreas([]);
          setNonGrazingAreas([]);
        }
      },
      (error) => {
        console.error("Error fetching geofencing areas from Firebase:", error);
        showMessageBox(
          `Failed to load geofencing areas: ${error.message}`,
          "error"
        );
      }
    );

    return () => unsubscribe();
  }, []);

  // Handle polygon creation and deletion for drawing tools
  const handleCreated = useCallback(async (latlngs, type) => {
    try {
      const areasRef = ref(iotDb, "geofencing_areas");
      const newAreaRef = push(areasRef);
      await set(newAreaRef, {
        type: type,
        coordinates: latlngs,
        created_at: new Date().toISOString(),
      });
      showMessageBox(`New ${type} area saved successfully!`, "success");
    } catch (err) {
      console.error("Error saving polygon to Firebase:", err);
      showMessageBox(`Error saving area: ${err.message}`, "error");
    }
  }, []);

  const handleDeleted = useCallback(
    async (layer) => {
      const latlngs = layer.getLatLngs()[0].map((ll) => ({
        lat: ll.lat,
        lng: ll.lng,
      }));

      const allAreas = [...grazingAreas, ...nonGrazingAreas];
      for (const area of allAreas) {
        if (area.coords.length === latlngs.length) {
          const matched = area.coords.every(
            (pt, i) =>
              Math.abs(pt.lat - latlngs[i].lat) < 0.00001 &&
              Math.abs(pt.lng - latlngs[i].lng) < 0.00001
          );
          if (matched) {
            try {
              const areaRef = ref(iotDb, `geofencing_areas/${area.id}`);
              await remove(areaRef);
              showMessageBox(`Area deleted successfully!`, "success");
              break;
            } catch (err) {
              console.error("Error deleting polygon from Firebase:", err);
              showMessageBox(`Error deleting area: ${err.message}`, "error");
            }
          }
        }
      }
    },
    [grazingAreas, nonGrazingAreas]
  );

  const getMapCenter = useCallback(() => {
    if (livestockData.latest_position) {
      return [
        livestockData.latest_position.latitude,
        livestockData.latest_position.longitude,
      ];
    }

    const animalIds = Object.keys(livestockData).filter(
      (id) => id.startsWith("offline_") && livestockData[id]?.latest_position
    );
    if (animalIds.length > 0) {
      const firstAnimalPos = livestockData[animalIds[0]].latest_position;
      return [firstAnimalPos.latitude, firstAnimalPos.longitude];
    }

    return [9.082, 8.6753]; // Default to Nigeria coordinate
  }, [livestockData]);

  const getAnimalMarkers = useCallback(() => {
    const markers = [];

    if (livestockData.latest_position) {
      const pos = livestockData.latest_position;
      const isInRestrictedArea = nonGrazingAreas.some((area) =>
        isPointInPolygon({ lat: pos.latitude, lng: pos.longitude }, area.coords)
      );

      markers.push({
        id: "main_device",
        name: "Main Device",
        position: [pos.latitude, pos.longitude],
        data: pos,
        isInRestrictedArea,
      });
    }

    Object.keys(livestockData).forEach((animalId) => {
      if (
        animalId.startsWith("offline_") &&
        livestockData[animalId]?.latest_position
      ) {
        const pos = livestockData[animalId].latest_position;
        const animalName = `Animal ${animalId.replace("offline_", "")}`;
        const isInRestrictedArea = nonGrazingAreas.some((area) =>
          isPointInPolygon(
            { lat: pos.latitude, lng: pos.longitude },
            area.coords
          )
        );

        markers.push({
          id: animalId,
          name: animalName,
          position: [pos.latitude, pos.longitude],
          data: pos,
          isInRestrictedArea,
        });
      }
    });

    return markers;
  }, [livestockData, nonGrazingAreas, isPointInPolygon]);

  const dismissAlarm = (alarmId) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== alarmId));
    showMessageBox(`Alarm dismissed.`, "info");
  };

  const animalMarkers = getAnimalMarkers();
  const mapCenter = getMapCenter();

  return {
    livestockData,
    grazingAreas,
    nonGrazingAreas,
    alarms,
    animalMarkers,
    mapCenter,
    dismissAlarm,
    messageBox,
    showMessageBox,
    drawType,
    setDrawType,
    handleCreated,
    handleDeleted,
  };
};

// Responsive wrapper for ChatBox
const ResponsiveChatBox = ({ userId, role }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-4">
      <Users className="text-green-600" size={24} />
      <h3 className="text-xl font-semibold">Community Chat</h3>
    </div>
    <div className="flex-1 min-h-0">
      <ChatBox userId={userId} role={role} />
    </div>
  </div>
);

const LawEnforcementDashboard = ({ userId = "law-enforcement" }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminSettingsTab, setAdminSettingsTab] = useState("notifications");

  // Get real-time data from Firebase
  const {
    grazingAreas,
    nonGrazingAreas,
    alarms,
    animalMarkers,
    mapCenter,
    dismissAlarm,
    messageBox,
    drawType,
    setDrawType,
    handleCreated,
    handleDeleted,
  } = IoTLivestockDashboard({ userRole: "law-enforcement" });

  // Calculate statistics from real data
  const stats = {
    activeIncidents: alarms.length,
    livestockTracked: animalMarkers.length,
    alertsToday: alarms.filter((alarm) => {
      const alarmDate = new Date(alarm.timestamp);
      const today = new Date();
      return alarmDate.toDateString() === today.toDateString();
    }).length,
    patrolUnits: 5, // This could be dynamic from Firebase too
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "monitoring", label: "Live Monitoring", icon: Eye },
    { id: "iotdevices", label: "IoT Devices", icon: Wifi },
    { id: "communications", label: "Communications", icon: Radio },
    { id: "ai-support", label: "AI Support", icon: Bot },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Message Box */}
            {messageBox.visible && (
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  messageBox.type === "error"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : messageBox.type === "warning"
                    ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                    : messageBox.type === "success"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-green-50 border-green-500 text-green-700"
                }`}
              >
                <p>{messageBox.message}</p>
              </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Incidents</h3>
                    <p className="text-3xl font-bold mt-2">
                      {stats.activeIncidents}
                    </p>
                  </div>
                  <AlertTriangle size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">
                  Requiring immediate attention
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Livestock Tracked</h3>
                    <p className="text-3xl font-bold mt-2">
                      {stats.livestockTracked}
                    </p>
                  </div>
                  <Users size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">IoT devices active</p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Alerts Today</h3>
                    <p className="text-3xl font-bold mt-2">
                      {stats.alertsToday}
                    </p>
                  </div>
                  <Bell size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">System notifications</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Patrol Units</h3>
                    <p className="text-3xl font-bold mt-2">
                      {stats.patrolUnits}
                    </p>
                  </div>
                  <Car size={48} className="opacity-80" />
                </div>
                <p className="text-sm mt-2 opacity-90">Currently deployed</p>
              </div>
            </div>

            {/* Active Alerts Panel */}
            {alarms.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    Active Alerts ({alarms.length})
                  </h3>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {alarms.slice(0, 3).map((alarm) => (
                    <div
                      key={alarm.id}
                      className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {alarm.message}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Clock size={12} />
                            {new Date(alarm.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                          Respond
                        </button>
                        <button
                          onClick={() => dismissAlarm(alarm.id)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Live Tracking Map
                </h3>
                <div className="h-96">
                  <LiveTrackingMap
                    center={mapCenter}
                    markers={animalMarkers}
                    grazingAreas={grazingAreas}
                    nonGrazingAreas={nonGrazingAreas}
                    userRole="law-enforcement"
                    onCreated={handleCreated}
                    onDeleted={handleDeleted}
                    drawType={drawType}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-red-600" size={20} />
                        <div>
                          <p className="font-medium text-red-800">
                            Emergency Response
                          </p>
                          <p className="text-sm text-red-600">
                            Deploy immediate assistance
                          </p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <Radio className="text-green-600" size={20} />
                        <div>
                          <p className="font-medium text-green-800">
                            Dispatch Units
                          </p>
                          <p className="text-sm text-green-600">
                            Coordinate patrol deployment
                          </p>
                        </div>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="text-green-600" size={20} />
                        <div>
                          <p className="font-medium text-green-800">
                            Generate Report
                          </p>
                          <p className="text-sm text-green-600">
                            Create incident documentation
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">GPS Tracking</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        Communication Network
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">Stable</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">IoT Sensors</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">
                          {stats.livestockTracked}/150 Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "monitoring":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Live Monitoring Center
              </h2>
              <p className="text-gray-600 mb-6">
                Real-time tracking of livestock movements, geofencing
                violations, and potential conflict zones.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="text-green-600" size={20} />
                    <span className="font-medium text-green-800">
                      Active Monitoring
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    {animalMarkers.length} devices being tracked
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-green-600" size={20} />
                    <span className="font-medium text-green-800">
                      Safe Zones
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    {grazingAreas.length} designated areas
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={20} />
                    <span className="font-medium text-red-800">
                      Alert Zones
                    </span>
                  </div>
                  <p className="text-sm text-red-600">
                    {nonGrazingAreas.length} restricted areas
                  </p>
                </div>
              </div>
            </div>

            {/* Geofencing Controls for Monitoring */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Geofencing Controls
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Select an area type to draw on the map. Use the drawing tools to
                create new zones or modify existing ones.
              </p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    value="grazing"
                    checked={drawType === "grazing"}
                    onChange={() => setDrawType("grazing")}
                    className="mr-2 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <span className="text-green-600 font-medium">
                    Grazing Area
                  </span>
                </label>
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    value="non-grazing"
                    checked={drawType === "non-grazing"}
                    onChange={() => setDrawType("non-grazing")}
                    className="mr-2 h-4 w-4 text-red-500 border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-red-400 font-medium">
                    Restricted Area
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="h-96">
                <LiveTrackingMap
                  center={mapCenter}
                  markers={animalMarkers}
                  grazingAreas={grazingAreas}
                  nonGrazingAreas={nonGrazingAreas}
                  userRole="law-enforcement"
                  onCreated={handleCreated}
                  onDeleted={handleDeleted}
                  drawType={drawType}
                />
              </div>
            </div>
          </div>
        );

      case "iotdevices":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">IoT Device Management</h2>
              <p className="text-gray-600 mb-6">
                Monitor device status, battery levels, and connectivity for all
                deployed livestock trackers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {animalMarkers.map((device) => (
                  <div
                    key={device.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {device.name}
                        </h3>
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
                        🏃<strong>Speed:</strong>{" "}
                        {device.data.speed_kmph || "N/A"} km/h
                      </p>
                      <p>
                        🧭<strong>Course:</strong> {device.data.course || "N/A"}
                        °
                      </p>
                      <p>
                        🛰️<strong>Satellites:</strong>{" "}
                        {device.data.satellites || "N/A"}
                      </p>
                      <p>
                        🏔️<strong>Altitude:</strong>{" "}
                        {device.data.altitude || "N/A"}
                      </p>
                      {/* <p><strong>Date:</strong> {device.data.date || 'N/A'}</p> */}
                      <p>
                        🔋<strong>Battery:</strong>{" "}
                        {device.data.battery || "N/A"}%
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
                        ⏲️<strong>Last Update:</strong>{" "}
                        {device.data.time || "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "communications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                Command Center Communications
              </h2>
              <p className="text-gray-600 mb-6">
                Coordinate with patrol units, farmers, herders, and other
                stakeholders for effective conflict prevention.
              </p>
            </div>
            <ResponsiveChatBox userId={userId} role="admin" />
          </div>
        );

      case "ai-support":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                AI-Powered Analysis & Support
              </h2>
              <p className="text-gray-600 mb-6">
                Get intelligent insights for conflict prediction, resource
                allocation, and strategic decision making.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-green-600" size={24} />
                <h3 className="text-xl font-semibold">AgroTrack AI</h3>
              </div>
              <AgroTrackChatBot />
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                Incident Reports Management
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Review, manage and track incident reports submitted through the
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 bg-red-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-red-600 font-semibold">Critical</span>
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <div className="flex-1 bg-yellow-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-yellow-600 font-semibold">Pending</span>
                  <span className="text-2xl font-bold text-yellow-600">7</span>
                </div>
                <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">
                    In Progress
                  </span>
                  <span className="text-2xl font-bold text-blue-600">5</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-x-auto">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
                  <option value="">All Statuses</option>
                  <option value="critical">Critical</option>
                  <option value="pending">Pending Review</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full sm:w-auto">
                  <option value="">All Types</option>
                  <option value="crop_damage">Crop Damage</option>
                  <option value="boundary_dispute">Boundary Dispute</option>
                  <option value="violence">Violence</option>
                  <option value="theft">Theft</option>
                  <option value="trespassing">Trespassing</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 flex-1 min-w-[200px]"
                />
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full sm:w-auto">
                  Export CSV
                </button>
              </div>
            </div>

            {/* Reports Table the red should be white*/}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-5xl w-full overflow-x-auto">
              <table className="min-w-full sm:w-full text-sm md:text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reporter
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Report 1 - Critical */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #RPT-2024-001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Adamu Garba
                          </div>
                          <div className="text-sm text-gray-500">
                            +234 803 123 4567
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Violence
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Plateau State, Jos North
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dec 25, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Critical
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-900">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                        Assign
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                        Contact
                      </button>
                    </td>
                  </tr>

                  {/* Report 2 - Pending */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #RPT-2024-002
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Musa Ibrahim
                          </div>
                          <div className="text-sm text-gray-500">
                            +234 816 987 6543
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Crop Damage
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Kaduna State, Zaria
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dec 24, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending Review
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                        Approve
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded">
                        Dismiss
                      </button>
                    </td>
                  </tr>

                  {/* Report 3 - In Progress */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #RPT-2024-003
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Fatima Aliyu
                          </div>
                          <div className="text-sm text-gray-500">
                            +234 701 234 5678
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Boundary Dispute
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Nasarawa State, Lafia
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dec 23, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Investigating
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-900">
                        Medium
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 bg-purple-100 px-3 py-1 rounded">
                        Update
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                        Escalate
                      </button>
                    </td>
                  </tr>

                  {/* Report 4 - Resolved */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #RPT-2024-004
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Sani Mohammed
                          </div>
                          <div className="text-sm text-gray-500">
                            +234 812 345 6789
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Trespassing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Benue State, Makurdi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dec 20, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-900">
                        Low
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded">
                        Archive
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded">
                        Report
                      </button>
                    </td>
                  </tr>

                  {/* Report 5 - Theft */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #RPT-2024-005
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            Hauwa Abdullahi
                          </div>
                          <div className="text-sm text-gray-500">
                            +234 809 876 5432
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Theft
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Kano State, Kano Municipal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dec 22, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Investigating
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-900">
                        High
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-green-600 hover:text-green-900 bg-green-100 px-3 py-1 rounded">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded">
                        Police
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 bg-orange-100 px-3 py-1 rounded">
                        Priority
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">5</span> of{" "}
                        <span className="font-medium">38</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          Previous
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          1
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-500 text-sm font-medium text-white">
                          2
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                          3
                        </button>
                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 text-red-700">
                  <AlertTriangle size={20} />
                  Emergency Response
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 text-blue-700">
                  <Phone size={20} />
                  Mass Alert System
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 text-green-700">
                  <FileText size={20} />
                  Generate Report
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 text-purple-700">
                  <Activity size={20} />
                  Analytics Dashboard
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            {/* Admin Settings Navigation */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg justify-between">
                <button
                  onClick={() => setAdminSettingsTab("notifications")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "notifications"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Bell size={16} />
                  Notifications
                </button>
                <button
                  onClick={() => setAdminSettingsTab("alerts")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "alerts"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <AlertTriangle size={16} />
                  Alert Thresholds
                </button>
                <button
                  onClick={() => setAdminSettingsTab("communication")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "communication"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Phone size={16} />
                  Communication
                </button>
                <button
                  onClick={() => setAdminSettingsTab("advanced")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "advanced"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Zap size={16} />
                  Advanced
                </button>
                <button
                  onClick={() => setAdminSettingsTab("security")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "security"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Lock size={16} />
                  Security
                </button>
                <button
                  onClick={() => setAdminSettingsTab("farmers")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 whitespace-nowrap rounded-md font-medium transition-colors text-xs ${
                    adminSettingsTab === "farmers"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Users size={16} />
                  Farmer Profiles
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            {adminSettingsTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Notification Settings
                  </h2>
                  <p className="text-gray-600">
                    Configure system-wide notification preferences
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Notification Channels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-green-600 bg-green-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <MessageSquare size={20} />
                          <span className="font-medium text-gray-800">
                            SMS Alerts
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Send SMS notifications for violations
                      </p>
                    </div>

                    <div className="text-blue-600 bg-blue-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Phone size={20} />
                          <span className="font-medium text-gray-800">
                            Voice Calls
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Automated voice call alerts
                      </p>
                    </div>

                    <div className="text-purple-600 bg-purple-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Mail size={20} />
                          <span className="font-medium text-gray-800">
                            Email Notifications
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Email alerts and reports
                      </p>
                    </div>

                    <div className="text-orange-600 bg-orange-50 p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} />
                          <span className="font-medium text-gray-800">
                            Push Notifications
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Web app notifications
                      </p>
                    </div>
                  </div>
                </div>

                {/* Test Notifications */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                     Send Automated Notifications <small className="text-red-500">(Coming Soon)</small>
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Test SMS to All Farmers
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Test Emergency Calls
                      </button>
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                        Send Email Report
                      </button>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        Push Notification Test
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alert Thresholds */}
            {adminSettingsTab === "alerts" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Alert Thresholds & Triggers
                  </h2>
                  <p className="text-gray-600">
                    Configure system alert parameters and thresholds
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    System Thresholds
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Geofence Violation Delay (minutes)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        defaultValue="1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Alert delay to avoid false positives
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Low Battery Alert (%)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="50"
                        defaultValue="20"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Battery percentage threshold
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inactivity Alert (meters/hour)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="1000"
                        defaultValue="100"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum movement for health check
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature Range (°C)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          defaultValue="-5"
                          className="w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          defaultValue="45"
                          className="w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Environmental temperature alerts
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Emergency Response <small className="text-red-500">(Coming Soon)</small>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">
                        Critical Alerts
                      </h4>
                      <p className="text-sm text-red-600 mb-3">
                        Immediate response required
                      </p>
                      <button className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Configure Critical
                      </button>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Warning Alerts
                      </h4>
                      <p className="text-sm text-yellow-600 mb-3">
                        Monitor closely
                      </p>
                      <button className="w-full px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        Configure Warnings
                      </button>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Info Alerts
                      </h4>
                      <p className="text-sm text-blue-600 mb-3">
                        General notifications
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Configure Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Communication Settings */}
            {adminSettingsTab === "communication" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Communication Settings
                  </h2>
                  <p className="text-gray-600">
                    Configure communication providers and emergency contacts
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Provider Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SMS Provider
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option value="twilio">Twilio</option>
                          <option value="nexmo">Nexmo/Vonage</option>
                          <option value="aws">AWS SNS</option>
                          <option value="custom">Custom Provider</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          placeholder="Enter API Key"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Voice Call Provider
                        </label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option value="twilio">Twilio Voice</option>
                          <option value="plivo">Plivo</option>
                          <option value="aws">AWS Connect</option>
                          <option value="custom">Custom Provider</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auth Token
                        </label>
                        <input
                          type="password"
                          placeholder="Enter Auth Token"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Emergency Contacts <small className="text-red-500">(Coming Soon)</small>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="tel"
                        placeholder="+234 xxx xxx xxxx"
                        defaultValue="+2348123456789"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="tel"
                        placeholder="+234 xxx xxx xxxx"
                        defaultValue="+2348987654321"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                      <Plus size={16} />
                      Add Emergency Contact
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Features */}
            {adminSettingsTab === "advanced" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">Advanced Features</h2>
                  <p className="text-gray-600">
                    Configure AI, integrations, and advanced analytics
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    AI & Analytics <small className="text-red-500">(Coming Soon)</small>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "AI Behavior Prediction",
                        description: "ML-powered animal behavior analysis",
                        color: "from-green-50 to-purple-50 border-green-200",
                      },
                      {
                        label: "Weather Intelligence",
                        description: "Correlate behavior with weather patterns",
                        color: "from-blue-50 to-cyan-50 border-blue-200",
                      },
                      {
                        label: "Market Price Tracking",
                        description: "Real-time livestock market prices",
                        color: "from-orange-50 to-red-50 border-orange-200",
                      },
                      {
                        label: "Health Monitoring",
                        description: "Vital signs and disease prediction",
                        color: "from-red-50 to-pink-50 border-red-200",
                      },
                      {
                        label: "Automatic Reporting",
                        description: "Automated compliance reports",
                        color: "from-purple-50 to-indigo-50 border-purple-200",
                      },
                      {
                        label: "Blockchain Logging",
                        description: "Immutable audit trail",
                        color: "from-gray-50 to-slate-50 border-gray-200",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-br ${feature.color} p-4 rounded-lg border`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            {feature.label}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Integration Settings <small className="text-red-500">(Coming Soon)</small>  
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Satellite Integration
                      </h4>
                      <p className="text-sm text-blue-600 mb-3">
                        Real-time satellite imagery
                      </p>
                      <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Configure Satellite API
                      </button>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">
                        Drone Integration
                      </h4>
                      <p className="text-sm text-green-600 mb-3">
                        Automated drone deployment
                      </p>
                      <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Setup Drone Fleet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {adminSettingsTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Security & Privacy Settings
                  </h2>
                  <p className="text-gray-600">
                    Configure system security and data protection
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Access Control
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-gray-600">
                          Require 2FA for admin access
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          API Encryption
                        </h4>
                        <p className="text-sm text-gray-600">
                          Encrypt all API communications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Audit Logging
                        </h4>
                        <p className="text-sm text-gray-600">
                          Log all system activities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Data Protection <small className="text-red-500">(Coming Soon)</small>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">
                        Data Retention
                      </h4>
                      <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="365">1 year</option>
                        <option value="forever">Indefinite</option>
                      </select>
                      <button className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Purge Old Data
                      </button>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Backup Settings
                      </h4>
                      <select className="w-full p-2 border border-gray-300 rounded-md mb-2">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Create Backup Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Profiles */}
            {adminSettingsTab === "farmers" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-2">Users Management</h2>
                  <p className="text-gray-600">
                    Manage registered Users and their information
                  </p>
                </div>

                {/* Farmer Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">5</p>
                  </div>
                  <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Active Farmers</h3>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">Active Herders</h3>
                    <p className="text-3xl font-bold">2</p>
                  </div>
                  <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold">
                      Suspended Accounts
                    </h3>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                </div>
                {/* Users List */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Registered Users
                    </h3>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                      <Plus size={16} />
                      Add User
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Contact
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Location
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Role
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Munachi Onyebuchi",
                            contact: "+2348123456789",
                            location: "Lagos, Nigeria",
                            status: "Active",
                          },
                          {
                            name: "Alhaji Musa",
                            contact: "+2348987654321",
                            location: "Abuja, Nigeria",
                            status: "Active",
                          },
                          {
                            name: "Samuel Eze",
                            contact: "+2348012345678",
                            location: "Kano, Nigeria",
                            status: "Active",
                          },
                        ].map((farmer, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b text-sm text-gray-800">
                              {farmer.name}
                            </td>
                            <td className="px-4 py-2 border-b text-sm text-gray-800">
                              {farmer.contact}
                            </td>
                            <td className="px-4 py-2 border-b text-sm text-gray-800">
                              {farmer.location}
                            </td>
                            <td className="px-4 py-2 border-b text-sm">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  farmer.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : farmer.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {farmer.status}
                              </span>
                            </td>
                            <td className="px-4 py-2 border-b text-sm">
                              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2">
                                Edit
                              </button>
                              <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 h-screen fixed top-0 left-0 overflow-x-hidden ${
          sidebarOpen ? "w-64" : "w-16"
        } lg:w-64 flex flex-col border-r border-gray-200/30`}
      >
        {/* Header */}
        <div className="p-1.5 border-b border-gray-200 flex items-center w-full">
          <div
            className={`flex items-center ${sidebarOpen ? "gap-3" : undefined}`}
          >
            <div className="w-11 h-10 bg-green-500 rounded-lg flex items-center justify-center p-2">
              <img src={sideBarLogo} alt="agrotrack_sidebar" />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"} lg:block pl-3`}>
              <h1 className="font-bold text-lg text-gray-800">AgroTrack</h1>
              <p className="text-sm text-gray-500">Law Enforcement</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    sidebarOpen ? "w-full" : "w-full"
                  } flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span
                    className={`${
                      sidebarOpen ? "block" : "hidden"
                    } lg:block font-medium`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {/* //logout button here */}
        <a href="/login">
          {" "}
          <button
            className={
              "sidebarOpen w-60 bg-red-100 flex m-3 items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            }
          >
            <X size={20} />
            <span
              className={`${
                sidebarOpen ? "block" : "hidden"
              } lg:block font-medium`}
            >
              Logout
            </span>
          </button>
        </a>
        <div className="p-4 border-t border-gray-200">
          <div className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="text-center">
              <p className="text-xs text-gray-500">AgroTrack v1.0</p>
              <p className="text-xs text-gray-400">Peace through Technology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } lg:ml-64`}
      >
        {/* Top Bar */}
        <header
          className={`bg-white border-b border-gray-200 px-4 ${
            sidebarOpen ? "py-1.5" : "p-0.5"
          } sticky top-0 right-0 flex items-center justify-between z-50`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {tabs.find((tab) => tab.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-gray-500">
                  Law Enforcement Command Center
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Systems Online</span>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell size={20} />
                </button>
                {alarms.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {alarms.length}
                  </div>
                )}
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">LE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LawEnforcementDashboard;

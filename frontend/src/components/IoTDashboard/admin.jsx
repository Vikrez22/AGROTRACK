import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bot,
  Menu,
  X,
  Shield,
  Users,
  AlertTriangle,
  Wifi,
  Eye,
  Bell,
  Radio,
  Car,
  FileText,
  Clock,
  SettingsIcon,
  Database,
} from "lucide-react";

// Import Leaflet components
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
  LayersControl,
} from "react-leaflet";
const { BaseLayer } = LayersControl;
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
import IotDevices from "./IotDevices";
import Communications from "./Communications";
import AiSupport from "./AiSupport";
import Reports from "./Reports";
import Settings from "./Settings";
import FirebaseDataTester from "./FirebaseDataTester";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import { usePresence } from "../../hooks/activity/usePresence";

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
        edit: {},
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

// Component to handle map re-centering when props change
const RecenterMap = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
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
  userLocation,
}) => (
  <MapContainer
    center={center}
    zoom={userLocation || markers.length > 0 ? 13 : 6}
    style={{ height: "100%", width: "100%" }}
  >
    <RecenterMap center={center} />
    <LayersControl position="topright">
      <BaseLayer checked name="OpenStreetMap">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </BaseLayer>
      <BaseLayer name="Satellite View">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community"
        />
      </BaseLayer>
    </LayersControl>

    {/* User Location Marker */}
    {userLocation && (
      <Marker position={userLocation}>
        <Popup>
          <strong>My Location</strong> <br />
          {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
        </Popup>
      </Marker>
    )}

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

const IoTLivestockDashboard = ({ userRole = "law-enforcement", userLocation }) => {
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
    if (userLocation) return userLocation;

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

    return [9.081999, 8.675277]; // Nigeria Precise Coordinate
  }, [livestockData, userLocation]);

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

const LawEnforcementDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user location for precise monitoring
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    }
  }, []);

  const { signOut } = useAuthMutations();
  usePresence();



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
  } = IoTLivestockDashboard({ userRole: "law-enforcement", userLocation });

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
    { id: "data-tester", label: "Firebase Tester", icon: Database },
    { id: "settings", label: "Settings", icon: SettingsIcon },
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
              <div className="bg-linear-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
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

              <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
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

              <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
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

              <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Emergency Units</h3>
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
                    userLocation={userLocation}
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
                  userLocation={userLocation}
                />
              </div>
            </div>
          </div>
        );

      case "iotdevices":
        return <IotDevices animalMarkers={animalMarkers} />;

      case "communications":
        return <Communications />;

      case "ai-support":
        return <AiSupport />;

      case "reports":
        return <Reports />;

      case "data-tester":
        return <FirebaseDataTester />;

      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden transition-all duration-300">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } lg:opacity-100 lg:pointer-events-none h-full bg-black/10 lg:bg-transparent fixed top-0 left-0 w-full z-2000! flex justify-between backdrop-blur-xs lg:backdrop-blur-none`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div
          className={`bg-white shadow-lg lg:shadow-none transition-all duration-300 flex flex-col border-r border-gray-200/30 h-full pointer-events-auto ${
            sidebarOpen
              ? "w-64 translate-x-0"
              : "w-0 -translate-x-full lg:translate-x-0 lg:w-64"
          } overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-2.5 border-b border-gray-200 flex items-center shrink-0">
            <div className="flex items-center">
              <a href="/">
                <div className="w-11 h-10 bg-green-500 rounded-lg flex items-center justify-center p-2 cursor-pointer">
                  <img src={sideBarLogo} alt="agrotrack_sidebar" />
                </div>
              </a>
              <div
                className={`${
                  sidebarOpen ? "block" : "hidden"
                } lg:block pl-3 whitespace-nowrap`}
              >
                <h1 className="font-bold text-lg text-gray-800">AgroTrack</h1>
                <p className="text-sm text-gray-500">Law Enforcement</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    activeTab === tab.id
                      ? "bg-green-50 text-green-600 font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {/* //logout button here */}
          <div className="shrink-0">
          <button
            onClick={() => signOut.mutate()}
            className={`w-full bg-red-100 flex mb-3 items-center gap-3 px-3 py-2 ${
              sidebarOpen ? "rounded-lg" : "rounded-none"
            } text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap`}
          >
            <X size={20} />
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:block font-medium`}>
              Logout
            </span>
          </button>

            <div className="p-4 border-t border-gray-200">
              <div
                className={`${
                  sidebarOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } lg:opacity-100 lg:pointer-events-none`}
              >
                <div className="text-center">
                  <p className="text-xs text-gray-500">AgroTrack v1.0</p>
                  <p className="text-xs text-gray-400">
                    Peace through Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-2 h-fit m-2 rounded-lg cursor-pointer hover:bg-white/80 transition-colors block lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <X size={25} className="text-red-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-2.5 flex items-center justify-between z-20 shrink-0 px-2.5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
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
              <div className="w-8 h-8 bg-linear-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">LE</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default LawEnforcementDashboard;

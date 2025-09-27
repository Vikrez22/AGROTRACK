// src/components/Cowtracking/GeoTracker.js
import React, { useEffect, useState, useRef, useCallback } from "react";
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

// Firebase Realtime Database imports (same as admin)
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

// Use the same IoT Firebase config as your admin component
const iotFirebaseConfig = {
  apiKey: "AIzaSyDaw8OdK1eaMCcOJgB6lHDFGn_hb9YIEdM",
  authDomain: "agrorithm-f4d87.firebaseapp.com",
  databaseURL: "https://agrorithm-f4d87-default-rtdb.firebaseio.com",
  projectId: "agrorithm-f4d87",
  storageBucket: "agrorithm-f4d87.firebasestorage.app",
  messagingSenderId: "1084500546652",
  appId: "1:1084500546652:web:c2a251d9585f7211448299",
};

// Initialize the same IoT Firebase app
const iotApp = initializeApp(iotFirebaseConfig, "iot-app");
const iotDb = getDatabase(iotApp);

// Fix Leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom icons (same as admin)
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

// Updated DrawControl component using the same structure as admin
const DrawControl = ({ onCreated, onDeleted, drawType }) => {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());
  const drawControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Add FeatureGroup to map if not already added
    if (!map.hasLayer(drawnItemsRef.current)) {
      map.addLayer(drawnItemsRef.current);
    }

    // Remove existing control if it exists
    if (drawControlRef.current) {
      try {
        map.removeControl(drawControlRef.current);
      } catch (e) {
        console.warn("Control removal error:", e);
      }
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

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.DELETED, handleDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.DELETED, handleDeleted);

      if (drawControlRef.current) {
        try {
          map.removeControl(drawControlRef.current);
        } catch (e) {
          console.warn("Control removal error:", e);
        }
      }
    };
  }, [map, onCreated, onDeleted, drawType]);

  return null;
};

const GeoTracker = ({ userRole }) => {
  // State for livestock data from IoT system
  const [livestockData, setLivestockData] = useState({});
  const [grazingAreas, setGrazingAreas] = useState([]);
  const [nonGrazingAreas, setNonGrazingAreas] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [drawType, setDrawType] = useState("grazing");
  const [alarms, setAlarms] = useState([]);

  // Point-in-polygon algorithm for geofencing
  const isPointInPolygon = useCallback((point, polygon) => {
    const x = point.lat, y = point.lng;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat, yi = polygon[i].lng;
      const xj = polygon[j].lat, yj = polygon[j].lng;
      
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }, []);

  // Listen to IoT livestock data from Firebase Realtime Database
  useEffect(() => {
    const livestockRef = ref(iotDb, '/');
    const unsubscribe = onValue(livestockRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setLivestockData(data);
      } else {
        setLivestockData({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to geofencing areas from Firebase Realtime Database (same path as admin)
  useEffect(() => {
    const areasRef = ref(iotDb, 'geofencing_areas');
    const unsubscribe = onValue(areasRef, (snapshot) => {
      if (snapshot.exists()) {
        const areas = snapshot.val();
        const grazing = [], nonGrazing = [];
        
        Object.keys(areas).forEach(areaId => {
          const area = areas[areaId];
          if (area.type === 'grazing') {
            grazing.push({ id: areaId, coords: area.coordinates });
          } else if (area.type === 'non-grazing') {
            nonGrazing.push({ id: areaId, coords: area.coordinates });
          }
        });
        
        setGrazingAreas(grazing);
        setNonGrazingAreas(nonGrazing);
      } else {
        setGrazingAreas([]);
        setNonGrazingAreas([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error("Error getting user location:", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Handle creating new geofencing areas (save to Realtime Database)
  const handleCreated = useCallback(async (latlngs, type) => {
    try {
      const areasRef = ref(iotDb, 'geofencing_areas');
      const newAreaRef = push(areasRef);
      await set(newAreaRef, {
        type: type,
        coordinates: latlngs,
        created_at: new Date().toISOString(),
      });
      console.log(`New ${type} area saved successfully!`);
    } catch (err) {
      console.error("Error saving polygon:", err);
    }
  }, []);

  // Handle deleting geofencing areas (remove from Realtime Database)
  const handleDeleted = useCallback(async (layer) => {
    const latlngs = layer.getLatLngs()[0].map((ll) => ({
      lat: parseFloat(ll.lat.toFixed(6)),
      lng: parseFloat(ll.lng.toFixed(6)),
    }));
    
    const allAreas = [...grazingAreas, ...nonGrazingAreas];
    for (const area of allAreas) {
      if (area.coords.length === latlngs.length) {
        const matched = area.coords.every((pt, i) =>
          Math.abs(pt.lat - latlngs[i].lat) < 0.00001 &&
          Math.abs(pt.lng - latlngs[i].lng) < 0.00001
        );
        if (matched) {
          try {
            const areaRef = ref(iotDb, `geofencing_areas/${area.id}`);
            await remove(areaRef);
            console.log("Area deleted successfully!");
            break;
          } catch (err) {
            console.error("Error deleting polygon:", err);
          }
        }
      }
    }
  }, [grazingAreas, nonGrazingAreas]);

  // Generate animal markers from IoT data (same logic as admin)
  const getAnimalMarkers = useCallback(() => {
    const markers = [];
    
    // Add Main Device position if available
    if (livestockData.latest_position) {
      const pos = livestockData.latest_position;
      const isInRestrictedArea = nonGrazingAreas.some(area => 
        isPointInPolygon({ lat: pos.latitude, lng: pos.longitude }, area.coords)
      );
      
      markers.push({
        id: 'main_device',
        name: 'Main Device',
        position: [pos.latitude, pos.longitude],
        data: pos,
        isInRestrictedArea,
      });
    }
    
    // Add Individual animal positions from 'offline_XXXXX' nodes
    Object.keys(livestockData).forEach(animalId => {
      if (animalId.startsWith('offline_') && livestockData[animalId]?.latest_position) {
        const pos = livestockData[animalId].latest_position;
        const animalName = `Animal ${animalId.replace('offline_', '')}`;
        const isInRestrictedArea = nonGrazingAreas.some(area => 
          isPointInPolygon({ lat: pos.latitude, lng: pos.longitude }, area.coords)
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

  const animalMarkers = getAnimalMarkers();

  // Determine map center
  const mapCenter = userLocation || 
    (livestockData.latest_position ? 
      [livestockData.latest_position.latitude, livestockData.latest_position.longitude] : 
      [9.082, 8.6753]);

  return (
    <div className="p-2 sm:p-3">
      <h2 className="font-semibold mb-3">Real-time Livestock Tracking & Geofencing</h2>

      {/* Geofencing Controls (only for admin/farmer roles) */}
      {(userRole === "admin" || userRole === "farmer") && (
        <div className="grazing-area flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Draw Area Type:</span>
          <label className="flex items-center">
            <input
              type="radio"
              value="grazing"
              checked={drawType === "grazing"}
              onChange={() => setDrawType("grazing")}
              className="mr-2"
            />
            <span className="text-green-700 font-medium">Grazing Area</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="non-grazing"
              checked={drawType === "non-grazing"}
              onChange={() => setDrawType("non-grazing")}
              className="mr-2"
            />
            <span className="text-red-700 font-medium">Restricted Area</span>
          </label>
        </div>
      )}

      {/* Map Container */}
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ width: "100%" }}
          className="w-full h-[400px]"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* User Location Marker */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                <strong>{userRole}</strong> Location: <br />
                {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </Popup>
            </Marker>
          )}

          {/* IoT Animal Markers */}
          {animalMarkers.map((animal) => (
            <Marker
              key={animal.id}
              position={animal.position}
              icon={animal.isInRestrictedArea ? alarmIcon : cowIcon}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-lg mb-2">{animal.name}</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Coordinates:</strong> {animal.data.latitude?.toFixed(6)}, {animal.data.longitude?.toFixed(6)}</p>
                    <p><strong>Altitude:</strong> {animal.data.altitude}m</p>
                    <p><strong>Speed:</strong> {animal.data.speed_kmph} km/h</p>
                    <p><strong>Course:</strong> {animal.data.course}°</p>
                    <p><strong>Time:</strong> {animal.data.time}</p>
                    {animal.isInRestrictedArea && (
                      <p className="text-red-600 font-bold mt-2">⚠️ IN RESTRICTED AREA!</p>
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
              <Popup>Safe Grazing Area</Popup>
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
          {(userRole === "admin" || userRole === "farmer") && (
            <DrawControl
              drawType={drawType}
              onCreated={handleCreated}
              onDeleted={handleDeleted}
            />
          )}
        </MapContainer>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-blue-800">{animalMarkers.length}</div>
          <div className="text-blue-600">Animals Tracked</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-green-800">{grazingAreas.length}</div>
          <div className="text-green-600">Grazing Areas</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-red-800">{nonGrazingAreas.length}</div>
          <div className="text-red-600">Restricted Areas</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <div className="font-semibold text-orange-800">
            {animalMarkers.filter(a => a.isInRestrictedArea).length}
          </div>
          <div className="text-orange-600">Alerts</div>
        </div>
      </div>
    </div>
  );
};

export default GeoTracker;
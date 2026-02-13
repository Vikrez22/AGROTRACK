import React, { useState, useEffect } from "react";
import { 
  Activity, 
  RefreshCw,
  Database
} from "lucide-react";
import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  onValue, 
  remove
} from "firebase/database";

const iotFirebaseConfig = {
  apiKey: "AIzaSyDaw8OdK1eaMCcOJgB6lHDFGn_hb9YIEdM",
  authDomain: "agrorithm-f4d87.firebaseapp.com",
  databaseURL: "https://agrorithm-f4d87-default-rtdb.firebaseio.com",
  projectId: "agrorithm-f4d87",
  storageBucket: "agrorithm-f4d87.firebasestorage.app",
  messagingSenderId: "1084500546652",
  appId: "1:1084500546652:web:c2a251d9585f7211448299",
};

const iotApp = initializeApp(iotFirebaseConfig, "tester-app");
const database = getDatabase(iotApp);

const FirebaseDataTester = () => {
  const [rawData, setRawData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const rootRef = ref(database, "/");
    const unsubscribe = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      setRawData(data);
      if (data) {
        // Extract recent hardware timestamp if available
        let hardwareInfo = "N/A";
        if (data.date && data.time) {
          hardwareInfo = `${data.date} ${data.time}`;
        } else if (data.latest_position?.date && data.latest_position?.time) {
          hardwareInfo = `${data.latest_position.date} ${data.latest_position.time}`;
        }

        setLogs(prev => [
          {
            timestamp: new Date().toLocaleTimeString(),
            action: "READ",
            detail: `Update received. Hardware Time: ${hardwareInfo}`
          },
          ...prev.slice(0, 49)
        ]);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="space-y-6">

        {/* Live Event Logs */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-[400px] w-full">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="text-blue-600" size={24} />
            Live Event Feed
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {logs.length === 0 && <p className="text-gray-400 text-center italic mt-10">Waiting for events...</p>}
            {logs.map((log, i) => (
              <div key={i} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold ${
                    log.action === "WRITE" ? "text-green-600" : 
                    log.action === "READ" ? "text-blue-600" : "text-red-600"
                  }`}>{log.action}</span>
                  <span className="text-xs text-gray-400">{log.timestamp}</span>
                </div>
                <p className="text-gray-700 line-clamp-2">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Hardware Status Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <RefreshCw className="text-green-600" size={24} />
          Recent Hardware Heartbeats
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                <th className="p-3 border-b">Device Identifier</th>
                <th className="p-3 border-b">Hardware Date</th>
                <th className="p-3 border-b">Hardware Time</th>
                <th className="p-3 border-b">Last Seen (Portal)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Main Device */}
              {rawData && (
                <tr className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium">Main System</td>
                  <td className="p-3 border-b">{rawData.date || rawData.latest_position?.date || "-"}</td>
                  <td className="p-3 border-b">{rawData.time || rawData.latest_position?.time || "-"}</td>
                  <td className="p-3 border-b text-gray-400">{new Date().toLocaleTimeString()}</td>
                </tr>
              )}
              {/* Dynamic Offline Devices */}
              {rawData && Object.keys(rawData).filter(k => k.startsWith('offline_')).map(key => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium">{key}</td>
                  <td className="p-3 border-b">{rawData[key].date || rawData[key].latest_position?.date || "-"}</td>
                  <td className="p-3 border-b">{rawData[key].time || rawData[key].latest_position?.time || "-"}</td>
                  <td className="p-3 border-b text-gray-400">{new Date().toLocaleTimeString()}</td>
                </tr>
              ))}
              {!rawData && (
                <tr>
                   <td colSpan="4" className="p-10 text-center text-gray-400 italic">No hardware data detected...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Data Viewer */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
            <Database className="text-yellow-500" size={24} />
            Raw JSON Tree (Realtime)
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm">Live Connection</span>
          </div>
        </div>
        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-[500px] overflow-y-auto">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FirebaseDataTester;

# AgroTrack Dashboard - Frontend Client

The frontend client of **AgroTrack** is a React single-page application built on Vite. It provides real-time tracking visualization, interactive map geofencing drawing tools, incident logs, and voice-assisted AI interfaces for farmers and herders.

---

## Technology Stack

*   **Framework**: [React](https://react.dev/) (v18)
*   **Build Tool**: [Vite](https://vite.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Maps & GIS**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) (for drawing virtual grazing zones)
*   **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest) (v5)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## Folder Structure

```
frontend/
├── public/                 # Static assets, fonts, app manifest, audio alarms
├── src/
│   ├── assets/             # Logos, maps background, default images
│   ├── components/         # Sub-divided by feature area:
│   │   ├── Auth/           # Login, Sign-up, Role-based route shields
│   │   ├── Cowtracking/    # Interactive GeoTracker maps, audio alarms, chatbot widgets
│   │   ├── Dashboard/      # Farmer & Herder dashboard layouts, settings, and overviews
│   │   ├── IoTDashboard/   # IoT hardware admins dashboards, device status, reports
│   │   └── Marketplace/    # Agricultural trading marketplace
│   ├── context/            # AuthContext (Role-based session details)
│   ├── hooks/              # Custom hooks (user status, chat, presence)
│   ├── services/           # Axios-based API service calls to backend
│   ├── styles/             # Application global styling sheets
│   ├── App.jsx             # Main routing configuration
│   └── index.jsx           # App entry point
├── tailwind.config.js      # Tailwind configuration stylesheet
├── vite.config.js          # Vite server bundle configuration
└── README.md               # Frontend docs (this file)
```

---

## Features Highlight

### 1. Interactive GeoTracker Maps
Built using Leaflet, this component displays real-time GPS signals sent from livestock collars. Users can toggle visibility of:
*   **Grazing Zones**: Allowed areas for cattle.
*   **Non-Grazing Zones**: Restrictive zones (e.g., active farmlands).
*   **Real-time collar positions**: Showing exact status and speed of individual cows.

### 2. Audio & Visual Alarms
An automated trigger checks if cattle enter a non-grazing zone. Once crossed, the browser triggers an audible alert sound (`agrorithm_alarm.mp3`) and issues a warning panel on the user's dashboard to notify them immediately.

### 3. Voice-Assisted AwaGPT Chatbot
An AI assistant designed for rural herders and farmers. 
*   Includes a record button using the browser's MediaRecorder API to record spoken queries.
*   Sends audio to the backend's Spitch STT API.
*   Receives natural language answers from the fine-tuned Nigerian N-ATLaS LLM or Groq.
*   Converts the response back to audio via Spitch TTS, playing it back in local languages (Yoruba, Hausa, Igbo, Nigerian Pidgin).

---

## Setup & Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm modules:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Copy the example configuration:
     ```bash
     cp .env.example .env
     ```
   * Open `.env` and fill in your Firebase Web App configuration credentials and backend API URL:
     ```env
     VITE_FIREBASE_API_KEY=AIzaSy...
     VITE_FIREBASE_AUTH_DOMAIN=agrotrack-fd730.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=agrotrack-fd730
     VITE_FIREBASE_STORAGE_BUCKET=agrotrack-fd730.firebasestorage.app
     VITE_FIREBASE_MESSAGING_SENDER_ID=764250066472
     VITE_FIREBASE_APP_ID=1:764250066472:web:03506a2aee45bcca4c6f1d
     VITE_FIREBASE_MEASUREMENT_ID=G-2NL2MWNKJW

     VITE_BACKEND_API_URL=http://localhost:3000
     ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:5173`.

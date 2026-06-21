# AgroTrack

### *Ending Farmer-Herder Conflicts with IoT, Geofencing, and AI*

AgroTrack is a smart AgriTech solution designed to prevent and resolve historical conflicts between farmers and herders in Nigeria. By combining IoT GPS tracking collars, customizable virtual geofences, automated SMS/audio alerts, and multi-lingual AI assistants, AgroTrack builds a bridge of peace and technology between agricultural communities.

---

## Key Features

*   **Real-time GPS Tracking**: Monitor livestock positions in real time on an interactive map.
*   **Smart Geofencing**: Define virtual "grazing" and "non-grazing" zones. The system instantly detects if livestock cross into farmlands.
*   **Instant Audio & Alarm Alerts**: Triggers real-time web alarms (`agrorithm_alarm.mp3`) and notifications when an animal enters a restricted zone.
*   **AwaGPT Multi-lingual Chatbot**: An AI assistant powered by **NCAIR's N-ATLaS** model (fine-tuned for Nigerian agricultural context) and Groq (Llama 3.3).
*   **Speech-to-Text & Text-to-Speech**: Built-in audio voice chat supporting local Nigerian languages (Yoruba, Hausa, Igbo, Nigerian Pidgin, Amharic) powered by **Spitch AI**.
*   **Comprehensive Dashboards**: Dedicated interfaces for Farmers, Herders, and IoT Admins to view device status, communication logs, and incident reports.

---

## Project Architecture

The project is structured as a monorepo consisting of two primary components:

*   **[`frontend`](./frontend)**: A React-based web dashboard built with Vite, Tailwind CSS, Leaflet, and TanStack Query.
*   **[`backend`](./backend)**: A Node.js and Express REST API integrating Firebase Admin (for Realtime Database synchronization), Appwrite SDK (for database storage/files), and AI/TTS endpoints.

```
AGROTRACK/
├── frontend/             # React (Vite) client dashboard application
│   ├── src/              # React components, contexts, hooks, services
│   ├── public/           # Static assets, audio alerts, and manifest files
│   └── .env.example      # Frontend configuration template
├── backend/              # Node.js / Express REST API
│   ├── config/           # Firebase and Appwrite setups
│   ├── controllers/      # Route controllers (user, chat, reports, etc.)
│   ├── routes/           # Express routers (AI, speech, incident reports)
│   └── .env.example      # Backend configuration template
└── README.md             # Project documentation (this file)
```

---

## Getting Started

Follow these steps to set up AgroTrack on your local machine:

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [npm](https://www.npmjs.com/) (installed automatically with Node)
*   [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Vikrez22/AGROTRACK.git
cd AGROTRACK
```

### Step 2: Configure the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   * Copy the template file: `cp .env.example .env` (or duplicate it manually).
   * Fill in the credentials in `.env` (Firebase private keys, Appwrite config, Groq/Hugging Face keys, and Spitch API key).
4. Run the backend dev server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:3000` (or the port defined in your `.env`).*

---

### Step 3: Configure the Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   * Copy the template file: `cp .env.example .env` (or duplicate it manually).
   * Enter your Firebase Web app keys and the backend API URL.
4. Start the frontend Vite dev server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` in your browser.*

---

## Environment Configuration

Both frontend and backend folders include `.env.example` templates. **Never commit your actual `.env` files.** 

*   **[`backend/.env.example`](./backend/.env.example)**: Used to configure your server port, Firebase Admin SDK private key, Appwrite endpoint + keys, Groq API key, Hugging Face token, and Spitch key.
*   **[`frontend/.env.example`](./frontend/.env.example)**: Used to define the client-side Firebase API keys, Firebase Project IDs, and your backend API base URL (`VITE_BACKEND_API_URL`).

---

## Contributing

We welcome contributions from developers, researchers, and agronomists to help scale AgroTrack!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.

# AgroTrack Backend - Node.js REST API

The backend service of **AgroTrack** is a Node.js REST API built using Express. It coordinates data flows between Appwrite (for relational logs and incidents), Firebase Admin (for real-time GPS coordinates updates), and AI speech endpoints.

---

## Technology Stack & API Providers

*   **Runtime Environment**: Node.js (Express framework)
*   **Database & File Storage**: [Appwrite](https://appwrite.io/) (via Appwrite Node SDK)
*   **Realtime Coordinates Sync**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) (Realtime Database synchronization)
*   **AI Assistants (LLM)**:
    *   **N-ATLaS**: An LLM fine-tuned by NCAIR for Nigerian agricultural queries, hosted via Hugging Face Inference API.
    *   **Groq API**: Llama 3.3 70B for fast generalized reasoning.
*   **Local Voices Speech Processing**:
    *   **Spitch AI**: Text-to-Speech (TTS) and Speech-to-Text (STT) for local Nigerian languages (Yoruba, Hausa, Igbo, Pidgin).

---

## Folder Structure

```
backend/
├── config/                 # Appwrite and Firebase configuration scripts
│   ├── appwrite.js         # Appwrite server client initiation
│   └── firebase.js         # Firebase Admin SDK init with service credentials
├── controllers/            # Route controllers containing logic
│   ├── activity.js         # Presence and active logs
│   ├── chat.js             # Farmer-herder chat message handlers
│   ├── report.js           # Incident reports submission
│   └── user.js             # User accounts and roles settings
├── middleware/             # Express middlewares
│   ├── authMiddleware.js   # JWT token authorization checks
│   └── upload.js           # Multer configuration for handling audio files upload
├── routes/                 # Express route mappings
│   ├── ai.js               # LLM chatbot & Spitch speech APIs (TTS/STT)
│   ├── user.js             # User auth routes
│   ├── chat.js             # Messaging routes
│   └── report.js           # Incident logging endpoints
├── server.js               # Main entry point (App listening logic)
├── package.json            # Node project configuration
└── README.md               # Backend API docs (this file)
```

---

## API Endpoints

### System Health
*   `GET /health` - Base server system health check.
*   `GET /api/ai/health` - Check connection to AI APIs (Groq, Hugging Face, Spitch).

### AI & Voice Endpoints
*   `POST /api/ai/natlas` - Chat with NCAIR N-ATLaS LLM (optimized for Nigerian agriculture).
*   `POST /api/ai/groq` - Chat with Llama 3.3 via Groq API.
*   `POST /api/ai/spitch/tts` - Spitch AI Text-to-Speech (translates text into voice: Yoruba Sade, Hausa Amina, Igbo Ngozi, Pidgin Ufoma).
*   `POST /api/ai/spitch/stt` - Spitch AI Speech-to-Text (transcribes user voice recordings sent from client).

### Users & Communication
*   `POST /api/users/` - User profiles and role assignments.
*   `GET /api/chats/` - Message history logs between farmers and herders.
*   `POST /api/reports/` - Log geofence breach reports or animal incidents.

---

## Setup & Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Copy the template file:
     ```bash
     cp .env.example .env
     ```
   * Open `.env` and fill in the required credentials:
     ```env
     PORT=3000

     # Firebase Configuration (Service Account Credentials)
     FIREBASE_PROJECT_ID=agrotrack-fd730
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBAD...YOUR_PRIVATE_KEY...\n-----END PRIVATE KEY-----"
     FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@agrotrack-fd730.iam.gserviceaccount.com

     # AI API Keys
     VITE_GROQ_API_KEY=gsk_your_groq_api_key
     VITE_APP_HF_API_KEY=hf_your_huggingface_token

     # Appwrite Configuration
     APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
     APPWRITE_PROJECT_ID=67fe6ff900327d4fc445
     APPWRITE_API_KEY=standard_your_appwrite_api_key
     APPWRITE_BUCKET_ID=692d65d90012e5b4b369

     # Spitch AI Configuration
     SPITCH_API_KEY=sk_your_spitch_api_key
     ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   *The console will log: `SERVER is live on port 3000`.*

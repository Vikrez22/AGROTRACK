import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import aiRoutes from "./routes/ai.js";
import chatRoutes from './routes/chat.js'
import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes)
app.use("/api/ai", aiRoutes);

// ADD THESE LINES TEMPORARILY TO DEBUG
console.log('=== Environment Check ===');
console.log('PORT:', process.env.PORT);
console.log('VITE_GROQ_API_KEY exists:', process.env.VITE_GROQ_API_KEY ? 'YES' : 'NO');
console.log('========================');

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is live on port ${PORT}`);
});

export default app;

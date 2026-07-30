import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/task.js"

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-taskit.vercel.app",
];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use("/api/tasks",taskRoutes)

connectDB();
app.get("/", (req, res) => {
    res.send("Server is running...")
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running om http://localhost:${PORT}`))
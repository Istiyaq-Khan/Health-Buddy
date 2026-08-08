import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require('./config/serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/healthbuddy";
mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.warn("MongoDB connection warning:", err.message));

// Routes
app.use("/api/health", healthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

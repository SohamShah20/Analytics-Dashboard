import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { tenantResolver } from "./middleware/tenantResolver.js";
import { requireAuth, requireAdmin } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(tenantResolver);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Usage Analytics API is running",
  });
});

app.get("/protected", requireAuth, (req, res) => {
  res.json({
    message: "Protected access granted",
    user: req.user,
  });
});

app.get("/admin-only", requireAuth, requireAdmin, (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
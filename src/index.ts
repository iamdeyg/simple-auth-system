import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth-routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Password Authentication API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

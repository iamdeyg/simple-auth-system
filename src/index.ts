require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const authRoutes = require("./routes/auth.routes");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

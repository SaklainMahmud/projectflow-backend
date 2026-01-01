require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json())

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("ProjectFlow API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path");
const announcementRoutes = require("./routes/announcementRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", announcementRoutes);

require("dotenv").config();
const quizRoutes = require("./routes/quizRoutes");
const cors = require("cors");

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/quizzes", quizRoutes);

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

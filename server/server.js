require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moduleRoutes = require("./routes/moduleRoutes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "SOS Emergency Response API" });
});

app.use("/api", moduleRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`API listening on port ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

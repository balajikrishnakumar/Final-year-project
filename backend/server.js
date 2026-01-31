const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

/* ===============================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* ===============================
   DATABASE
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

/* ===============================
   ROUTES
================================ */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chatbot", require("./routes/chatbot.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/counsellor", require("./routes/counsellor.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

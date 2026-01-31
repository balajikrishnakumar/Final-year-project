const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  getCounsellorAppointments,
  updateAppointmentStatus,
} = require("../controllers/counsellor.controller");

const router = express.Router();

router.get("/appointments", auth, getCounsellorAppointments);

router.patch("/appointments/:id/status", auth, updateAppointmentStatus);

module.exports = router;

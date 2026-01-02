const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointment.controller");

/* ================================
   BOOK APPOINTMENT (STUDENT)
================================ */
router.post("/", auth, bookAppointment);

/* ================================
   GET APPOINTMENTS
   - Student → own appointments
   - Counsellor → assigned appointments
================================ */
router.get("/", auth, getAppointments);

/* ================================
   UPDATE APPOINTMENT STATUS
   (COUNSELLOR ONLY)
================================ */
router.patch("/:id/status", auth, updateAppointmentStatus);

module.exports = router;

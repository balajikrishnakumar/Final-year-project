import Appointment from "../models/Appointment.js";

/* ================================
   BOOK APPOINTMENT (STUDENT)
================================ */
export const bookAppointment = async (req, res) => {
  try {
    const { counsellorId, date, time, notes } = req.body;

    if (!counsellorId || !date || !time) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // Only students can book
    if (req.user.role !== "student") {
      return res.status(403).json({ msg: "Only students can book appointments" });
    }

    const appointment = await Appointment.create({
      studentId: req.user.id,
      counsellorId,
      date,
      time,
      notes: notes || "",
      status: "pending",
    });

    res.status(201).json({
      msg: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    console.error("BOOK APPOINTMENT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* ================================
   GET APPOINTMENTS
   - Student → their appointments
   - Counsellor → their appointments
================================ */
export const getAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "student") {
      filter.studentId = req.user.id;
    }

    if (req.user.role === "counsellor") {
      filter.counsellorId = req.user.id;
    }

    const appointments = await Appointment.find(filter)
      .populate("studentId", "name email")
      .populate("counsellorId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("FETCH APPOINTMENTS ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch appointments" });
  }
};

/* ================================
   UPDATE APPOINTMENT STATUS
   (COUNSELLOR ONLY)
================================ */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    if (req.user.role !== "counsellor") {
      return res.status(403).json({ msg: "Only counsellors can update status" });
    }

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        counsellorId: req.user.id,
      },
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    res.status(200).json({
      msg: "Appointment status updated",
      appointment,
    });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    res.status(500).json({ msg: "Failed to update status" });
  }
};

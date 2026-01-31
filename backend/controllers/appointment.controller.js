import Appointment from "../models/Appointment.js";
import { sendAppointmentEmail } from "../services/email.service.js";

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

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    if (req.user.role !== "counsellor") {
      return res.status(403).json({ msg: "Only counsellors allowed" });
    }

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      counsellorId: req.user.id,
    }).populate("studentId", "email name");

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // 📧 EMAIL NOTIFICATION
    const emailText =
      status === "accepted"
        ? `Hello ${appointment.studentId.name},
Your appointment has been ACCEPTED.

Date: ${appointment.date}
Time: ${appointment.time}

Regards,
MindfulU`
        : `Hello ${appointment.studentId.name},
Your appointment was REJECTED due to counsellor unavailability.

Please book another slot.

Regards,
MindfulU`;

    await sendAppointmentEmail({
      to: appointment.studentId.email,
      subject:
        status === "accepted"
          ? "Appointment Accepted"
          : "Appointment Rejected",
      text: emailText,
    });

    return res.status(200).json({
      msg: `Appointment ${status}`,
      appointment,
    });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

exports.getCounsellorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      counsellorId: req.user.id,
    }).populate("studentId", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load appointments" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Notify student
    await Notification.create({
      userId: appointment.studentId,
      message: `Your appointment was ${status}`,
    });

    res.json({ msg: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status" });
  }
};

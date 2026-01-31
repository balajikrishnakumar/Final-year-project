const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAppointmentEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"MindfulU" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

module.exports = { sendAppointmentEmail };

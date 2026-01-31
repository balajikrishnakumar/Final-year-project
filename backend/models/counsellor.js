const mongoose = require("mongoose");

const counsellorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counsellor", counsellorSchema);

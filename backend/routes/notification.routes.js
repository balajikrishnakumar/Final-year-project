const express = require("express");
const auth = require("../middleware/auth.middleware");
const Notification = require("../models/Notification");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

module.exports = router;

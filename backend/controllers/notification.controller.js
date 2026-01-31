exports.sendNotification = (req, res) => {
  res.json({ msg: "Notification sent (handled via Socket.IO)" });
};

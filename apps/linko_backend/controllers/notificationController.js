exports.getNotifications = (req, res) => {
  res.json({ message: "getNotifications" });
};
exports.markAsRead = (req, res) => {
  res.json({ message: "markAsRead" });
};
exports.markAllAsRead = (req, res) => {
  res.json({ message: "markAllAsRead" });
};
exports.deleteNotification = (req, res) => {
  res.json({ message: "deleteNotification" });
};
exports.clearAllNotifications = (req, res) => {
  res.json({ message: "clearAllNotifications" });
};
exports.getUnreadCount = (req, res) => {
  res.json({ message: "getUnreadCount" });
};

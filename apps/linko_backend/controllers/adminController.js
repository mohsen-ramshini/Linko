exports.getAllUsers = (req, res) => {
  res.json({ message: "getAllUsers" });
};
exports.banUser = (req, res) => {
  res.json({ message: "banUser" });
};
exports.verifyUser = (req, res) => {
  res.json({ message: "verifyUser" });
};
exports.getAllPosts = (req, res) => {
  res.json({ message: "getAllPosts" });
};
exports.deletePost = (req, res) => {
  res.json({ message: "deletePost" });
};
exports.getReports = (req, res) => {
  res.json({ message: "getReports" });
};
exports.getPendingReports = (req, res) => {
  res.json({ message: "getPendingReports" });
};
exports.resolveReport = (req, res) => {
  res.json({ message: "resolveReport" });
};
exports.getSystemStats = (req, res) => {
  res.json({ message: "getSystemStats" });
};
exports.getDailyStats = (req, res) => {
  res.json({ message: "getDailyStats" });
};

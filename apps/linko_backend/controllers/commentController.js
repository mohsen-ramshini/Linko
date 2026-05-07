exports.getCommentById = (req, res) => {
  res.json({ message: "getCommentById" });
};

exports.updateComment = (req, res) => {
  res.json({ message: "updateComment" });
};

exports.deleteComment = (req, res) => {
  res.json({ message: "deleteComment" });
};

exports.toggleCommentLike = (req, res) => {
  res.json({ message: "toggleCommentLike" });
};

exports.removeCommentLike = (req, res) => {
  res.json({ message: "removeCommentLike" });
};

exports.addReply = (req, res) => {
  res.json({ message: "addReply" });
};

exports.getReplies = (req, res) => {
  res.json({ message: "getReplies" });
};

exports.reportComment = (req, res) => {
  res.json({ message: "reportComment" });
};

exports.getConversations = (req, res) => {
  res.json({ message: "getConversations" });
};

exports.createConversation = (req, res) => {
  res.json({ message: "createConversation" });
};

exports.getConversationDetails = (req, res) => {
  res.json({ message: "getConversationDetails" });
};

exports.updateConversation = (req, res) => {
  res.json({ message: "updateConversation" });
};

exports.deleteConversation = (req, res) => {
  res.json({ message: "deleteConversation" });
};

exports.muteConversation = (req, res) => {
  res.json({ message: "muteConversation" });
};

exports.archiveConversation = (req, res) => {
  res.json({ message: "archiveConversation" });
};

exports.getMessages = (req, res) => {
  res.json({ message: "getMessages" });
};

exports.sendMessage = (req, res) => {
  res.json({ message: "sendMessage" });
};

exports.updateMessage = (req, res) => {
  res.json({ message: "updateMessage" });
};

exports.deleteMessage = (req, res) => {
  res.json({ message: "deleteMessage" });
};

exports.markAsRead = (req, res) => {
  res.json({ message: "markAsRead" });
};

exports.getUnreadCount = (req, res) => {
  res.json({ message: "getUnreadCount" });
};

exports.startTyping = (req, res) => {
  res.json({ message: "startTyping" });
};

exports.stopTyping = (req, res) => {
  res.json({ message: "stopTyping" });
};
exports.reactToMessage = (req, res) => {
  res.json({ message: "reactToMessage" });
};
exports.removeReaction = (req, res) => {
  res.json({ message: "removeReaction" });
};
exports.addGroupMember = (req, res) => {
  res.json({ message: "addGroupMember" });
};
exports.removeGroupMember = (req, res) => {
  res.json({ message: "removeGroupMember" });
};
exports.updateGroupInfo = (req, res) => {
  res.json({ message: "updateGroupInfo" });
};
exports.makeAdmin = (req, res) => {
  res.json({ message: "makeAdmin" });
};

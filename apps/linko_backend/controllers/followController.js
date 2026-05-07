exports.followUser = (req, res) => {
  res.json({ message: "followUser" });
};

exports.unfollowUser = (req, res) => {
  res.json({ message: "unfollowUser" });
};

exports.getFollowStatus = (req, res) => {
  res.json({ message: "getFollowStatus" });
};

exports.getFollowRequests = (req, res) => {
  res.json({ message: "getFollowRequests" });
};

exports.acceptFollowRequest = (req, res) => {
  res.json({ message: "acceptFollowRequest" });
};

exports.rejectFollowRequest = (req, res) => {
  res.json({ message: "rejectFollowRequest" });
};

exports.getFollowSuggestions = (req, res) => {
  res.json({ message: "getFollowSuggestions" });
};

exports.getMutualFollowers = (req, res) => {
  res.json({ message: "getMutualFollowers" });
};

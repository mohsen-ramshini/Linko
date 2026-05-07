exports.getPosts = (req, res) => {
  res.json({ message: "Get posts" });
};

exports.getFeed = (req, res) => {
  res.json({ message: "Get posts feed" });
};

exports.getTrendingPosts = (req, res) => {
  res.json({ message: "Get trending posts" });
};

exports.getExplorePosts = (req, res) => {
  res.json({ message: "Get exploring posts" });
};

exports.getPostsByMedia = (req, res) => {
  res.json({ message: "Get getPostsByMedia" });
};

exports.createPost = (req, res) => {
  res.json({ message: "Get createPost" });
};

exports.getPostById = (req, res) => {
  res.json({ message: "Get getPostById" });
};

exports.updatePost = (req, res) => {
  res.json({ message: "Get updatePost" });
};

exports.deletePost = (req, res) => {
  res.json({ message: "deletePost" });
};

exports.togglePostLike = (req, res) => {
  res.json({ message: "togglePostLike" });
};

exports.getPostLikes = (req, res) => {
  res.json({ message: "getPostLikes" });
};

exports.addComment = (req, res) => {
  res.json({ message: "addComment" });
};

exports.getPostComments = (req, res) => {
  res.json({ message: "getPostComments" });
};

exports.repostPost = (req, res) => {
  res.json({ message: "repostPost" });
};

exports.savePost = (req, res) => {
  res.json({ message: "savePost" });
};
exports.unsavePost = (req, res) => {
  res.json({ message: "unsavePost" });
};
exports.getSavedPosts = (req, res) => {
  res.json({ message: "getSavedPosts" });
};
exports.reportPost = (req, res) => {
  res.json({ message: "reportPost" });
};
exports.getPostAnalytics = (req, res) => {
  res.json({ message: "getPostAnalytics" });
};
exports.removeRepost = (req, res) => {
  res.json({ message: "removeRepost" });
};

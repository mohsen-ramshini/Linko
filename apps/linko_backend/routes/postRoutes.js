const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/", postController.getPosts);
router.get("/feed", postController.getFeed);

router.get("/trending", postController.getTrendingPosts);
router.get("/explore", postController.getExplorePosts);
router.get("/media", postController.getPostsByMedia);

router.post("/", postController.createPost);
router.get("/:postId", postController.getPostById);
router.patch("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

router.post("/:postId/like", postController.togglePostLike);
router.get("/:postId/likes", postController.getPostLikes);
router.post("/:postId/comment", postController.addComment);
router.get("/:postId/comments", postController.getPostComments);
router.post("/:postId/repost", postController.repostPost);
router.delete("/:postId/repost", postController.removeRepost);

router.post("/:postId/save", postController.savePost);
router.delete("/:postId/save", postController.unsavePost);
router.get("/saved", postController.getSavedPosts);
router.post("/:postId/report", postController.reportPost);

router.get("/:postId/analytics", postController.getPostAnalytics);

module.exports = router;
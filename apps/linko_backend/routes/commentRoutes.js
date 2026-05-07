const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.get("/:commentId", commentController.getCommentById);
router.patch("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);

router.post("/:commentId/like", commentController.toggleCommentLike);
router.delete("/:commentId/like", commentController.removeCommentLike);

router.post("/:commentId/reply", commentController.addReply);
router.get("/:commentId/replies", commentController.getReplies);

router.post("/:commentId/report", commentController.reportComment);

module.exports = router;
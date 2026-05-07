const express = require("express");
const storyController = require("../controllers/storyController");
const router = express.Router();

router.get("/", storyController.getStories);
router.post("/", storyController.createStory);
router.get("/:storyId", storyController.getStoryById);
router.delete("/:storyId", storyController.deleteStory);

router.post("/:storyId/view", storyController.markStoryAsViewed);
router.get("/:storyId/viewers", storyController.getStoryViewers);
router.patch("/:storyId/reply", storyController.replyToStory);

router.patch("/:storyId/highlight", storyController.addToHighlight);
router.get("/highlights", storyController.getMyHighlights);
router.get("/users/:userId/highlights", storyController.getUserHighlights);

router.get("/archive", storyController.getStoryArchive);

module.exports = router;
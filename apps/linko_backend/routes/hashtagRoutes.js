const express = require("express");
const hashtagController = require("../controllers/hashtagController");
const router = express.Router();

router.get("/trending", hashtagController.getTrendingHashtags);
router.get("/search", hashtagController.searchHashtags);
router.get("/:tag", hashtagController.getHashtagDetails);
router.get("/:tag/posts", hashtagController.getPostsByHashtag);

module.exports = router;
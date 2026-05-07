const express = require("express");
const followController = require("../controllers/followController");
const router = express.Router();

router.post("/:userId/follow", followController.followUser);
router.delete("/:userId/follow", followController.unfollowUser);
router.get("/:userId/follow-status", followController.getFollowStatus);

router.get("/requests", followController.getFollowRequests);
router.post("/requests/:requestId/accept", followController.acceptFollowRequest);
router.post("/requests/:requestId/reject", followController.rejectFollowRequest);

router.get("/suggestions", followController.getFollowSuggestions);
router.get("/mutual/:userId", followController.getMutualFollowers);

module.exports = router;
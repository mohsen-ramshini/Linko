const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", userController.getUserById);
router.get("/:userId/posts", userController.getUserPosts);
router.get("/:userId/followers", userController.getUserFollowers);
router.get("/:userId/following", userController.getUserFollowing);
router.get("/:userId/stories", userController.getUserStories);
router.get("/:userId/stats", userController.getUserStats);
router.get("/:userId/activity", userController.getUserActivity);
router.get("/:userId/suggestions", userController.getUserSuggestions);
router.get("/search", userController.searchUsers);

router.patch("/:userId", userController.updateUser);
router.patch("/:userId/avatar", userController.updateUserAvatar);
router.patch("/:userId/cover", userController.updateUserCover);
router.patch("/settings", userController.updateUserSettings);
router.patch("/settings/privacy", userController.updateUserSettingsPrivacy);
router.patch(
  "/settings/notifications",
  userController.updateUserSettingsNotifications,
);

module.exports = router;

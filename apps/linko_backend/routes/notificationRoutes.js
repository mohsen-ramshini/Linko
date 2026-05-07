const express = require("express");
const notificationController = require("../controllers/notificationController");
const router = express.Router();

router.get("/", notificationController.getNotifications);
router.patch("/notifications/:id/read", notificationController.markAsRead);
router.patch("/notifications/read-all", notificationController.markAllAsRead);
router.delete("/notifications/:id", notificationController.deleteNotification);
router.delete("/notifications/clear-all", notificationController.clearAllNotifications);

router.get("/unread-count", notificationController.getUnreadCount);

// router.patch("/settings", notificationController.updateNotificationSettings);

module.exports = router;
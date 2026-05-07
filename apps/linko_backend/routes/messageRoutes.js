const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.get("/conversations", messageController.getConversations);
router.post("/conversations", messageController.createConversation);
router.get("/conversations/:conversationId", messageController.getConversationDetails);
router.patch("/conversations/:conversationId", messageController.updateConversation);
router.delete("/conversations/:conversationId", messageController.deleteConversation);
router.patch("/conversations/:conversationId/mute", messageController.muteConversation);
router.patch("/conversations/:conversationId/archive", messageController.archiveConversation);

router.get("/conversations/:conversationId/messages", messageController.getMessages);
router.post("/conversations/:conversationId/messages", messageController.sendMessage);
router.patch("/messages/:messageId", messageController.updateMessage);
router.delete("/messages/:messageId", messageController.deleteMessage);

router.post("/messages/:messageId/read", messageController.markAsRead);
router.get("/messages/unread-count", messageController.getUnreadCount);

router.post("/conversations/:conversationId/typing", messageController.startTyping);
router.delete("/conversations/:conversationId/typing", messageController.stopTyping);

router.post("/messages/:messageId/react", messageController.reactToMessage);
router.delete("/messages/:messageId/react", messageController.removeReaction);

router.post("/conversations/:conversationId/add-members", messageController.addGroupMember);
router.post("/conversations/:conversationId/remove-member", messageController.removeGroupMember);
router.patch("/conversations/:conversationId/group-info", messageController.updateGroupInfo);
router.post("/conversations/:conversationId/make-admin", messageController.makeAdmin);

module.exports = router;
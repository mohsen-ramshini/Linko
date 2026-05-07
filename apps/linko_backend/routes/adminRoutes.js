const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/ban", adminController.banUser);
router.patch("/users/:id/verify", adminController.verifyUser);

router.get("/posts", adminController.getAllPosts);
router.delete("/posts/:id", adminController.deletePost);

router.get("/reports", adminController.getReports);
router.get("/reports/pending", adminController.getPendingReports);
router.patch("/reports/:id/resolve", adminController.resolveReport);

router.get("/stats", adminController.getSystemStats);
router.get("/stats/daily", adminController.getDailyStats);

module.exports = router;
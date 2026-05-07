const express = require("express");
const reportController = require("../controllers/reportController");
const router = express.Router();

router.post("/", reportController.createReport);

router.get("/", reportController.getReports);
router.patch("/:id", reportController.updateReportStatus);

module.exports = router;
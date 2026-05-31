const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityLogController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: System activity logs
 */

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     summary: Get all activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authMiddleware,requireRole(["Admin", "Manager"]), activityController.getLogs);

module.exports = router;
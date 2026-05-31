const express = require("express");
const router = express.Router();

const lowStockController = require("../controllers/lowStockController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");


/**
 * @swagger
 * tags:
 *   name: Low Stock Alerts
 *   description: Inventory stock alerts
 */

/**
 * @swagger
 * /api/low-stock:
 *   get:
 *     summary: Get all low stock alerts
 *     tags: [Low Stock Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authMiddleware,requireRole(["Admin", "Manager"]) ,lowStockController.getAlerts);

/**
 * @swagger
 * /api/low-stock/{id}/resolve:
 *   put:
 *     summary: Resolve low stock alert
 *     tags: [Low Stock Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alert resolved
 */
router.put(
  "/:id/resolve",
  authMiddleware,
  requireRole(["Admin", "Manager"]),
  lowStockController.resolveAlert
);

module.exports = router;
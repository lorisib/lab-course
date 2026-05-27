const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Analytics and statistics
 */

/**
 * @swagger
 * /api/dashboard/kpis:
 *   get:
 *     summary: Get dashboard KPIs
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: KPI data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/kpis", authMiddleware, dashboardController.getKPIs);

/**
 * @swagger
 * /api/dashboard/monthly-sales:
 *   get:
 *     summary: Get monthly sales statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales data
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/monthly-sales",
  authMiddleware,
  dashboardController.getMonthlySales
);

module.exports = router;
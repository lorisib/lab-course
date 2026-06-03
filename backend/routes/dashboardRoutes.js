const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");


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
router.get("/kpis", authMiddleware ,dashboardController.getKPIs);

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
  "/monthly-sales", authMiddleware,  dashboardController.getMonthlySales);

/**
 * @swagger
 * /api/dashboard/best-selling-products:
 *   get:
 *     summary: Get best selling products
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of top selling products
 */
router.get("/best-selling-products", authMiddleware,  dashboardController.getBestSellingProducts);


module.exports = router;
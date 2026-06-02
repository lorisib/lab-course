const express = require("express");
const router = express.Router();

const discountController = require("../controllers/discountController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount Management
 */

/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               discount_type:
 *                 type: string
 *                 example: percentage
 *               value:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       201:
 *         description: Discount created
 */
router.post("/", auth, discountController.createDiscount);

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of discounts
 */
router.get("/", auth, discountController.getAllDiscounts);

module.exports = router;
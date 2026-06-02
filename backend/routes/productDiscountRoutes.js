const express = require("express");
const router = express.Router();

const controller = require("../controllers/productDiscountController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: ProductDiscounts
 *   description: Assign discounts to products
 */

/**
 * @swagger
 * /api/product-discounts/assign:
 *   post:
 *     summary: Assign discount to product
 *     tags: [ProductDiscounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               discount_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Discount assigned successfully
 */
router.post("/assign", auth, controller.assignDiscount);

module.exports = router;
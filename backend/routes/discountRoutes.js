const express = require("express");
const router = express.Router();

const discountController = require("../controllers/discountController");
const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

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

/**
 * @swagger
 * /api/discounts/{id}:
 *   put:
 *     summary: Update discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id",auth,requireRole(["Admin", "Manager"]),discountController.updateDiscount);
/**
 * @swagger
 * /api/discounts/{id}:
 *   delete:
 *     summary: Delete discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id",auth,requireRole(["Admin", "Manager"]),discountController.deleteDiscount);

module.exports = router;


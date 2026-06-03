const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const loyaltyController = require("../controllers/loyaltyCardController");

/**
 * @swagger
 * tags:
 *   name: Loyalty
 *   description: Loyalty Card Management
 */

/**
 * @swagger
 * /api/loyalty:
 *   post:
 *     summary: Create loyalty card for customer
 *     tags: [Loyalty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Loyalty card created successfully
 *       400:
 *         description: Card already exists
 *       404:
 *         description: Customer not found
 */
router.post("/", authMiddleware, loyaltyController.createCard);

/**
 * @swagger
 * /api/loyalty/{customerId}:
 *   get:
 *     summary: Get loyalty card by customer ID
 *     tags: [Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Loyalty card data
 *       404:
 *         description: Card not found
 */
router.get("/:customerId", authMiddleware, loyaltyController.getCard);

/**
 * @swagger
 * /api/loyalty-cards:
 *   get:
 *     summary: Get all loyalty cards
 *     tags: [Loyalty Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of loyalty cards
 */
router.get("/", authMiddleware, loyaltyController.getAllCards);

/**
 * @swagger
 * /api/loyalty/{id}:
 *   put:
 *     summary: Update loyalty card
 *     tags: [Loyalty Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Loyalty Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_points:
 *                 type: integer
 *               level:
 *                 type: string
 *                 enum: [Bronze, Silver, Gold, Platinum]
 *               status:
 *                 type: string
 *                 enum: [active, frozen, expired, cancelled]
 *               issue_date:
 *                 type: string
 *                 format: date
 *               expiration_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Loyalty card updated
 *       404:
 *         description: Not found
 */
router.put("/:id", authMiddleware, loyaltyController.updateCard);

module.exports = router;
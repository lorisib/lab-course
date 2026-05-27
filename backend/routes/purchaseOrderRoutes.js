const express = require("express");
const router = express.Router();

const purchaseOrderController = require("../controllers/purchaseOrderController");

const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Purchase Orders
 *   description: Purchase order management
 */

/**
 * @swagger
 * /api/purchase-orders:
 *   post:
 *     summary: Create purchase order
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_id:
 *                 type: integer
 *                 example: 1
 *               ordered_by_user_id:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 10
 *                     unit_price:
 *                       type: number
 *                       example: 20
 *     responses:
 *       201:
 *         description: Purchase order created
 */
router.post(
  "/",
  authMiddleware,
  purchaseOrderController.createPurchaseOrder
);

/**
 * @swagger
 * /api/purchase-orders:
 *   get:
 *     summary: Get all purchase orders
 *     tags: [Purchase Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/",
  authMiddleware,
  purchaseOrderController.getAllPurchaseOrders
);

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   get:
 *     summary: Get purchase order by ID
 *     tags: [Purchase Orders]
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
 *         description: Success
 */
router.get(
  "/:id",
  authMiddleware,
  purchaseOrderController.getPurchaseOrderById
);

/**
 * @swagger
 * /api/purchase-orders/{id}:
 *   delete:
 *     summary: Delete purchase order
 *     tags: [Purchase Orders]
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
 *         description: Deleted successfully
 */
router.delete(
  "/:id",
  authMiddleware,
  purchaseOrderController.deletePurchaseOrder
);

module.exports = router;
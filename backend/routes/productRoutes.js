const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get(
  "/",
  authMiddleware,
  productController.getAllProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
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
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get(
  "/:id",
  authMiddleware,
  productController.getProductById
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (with image upload)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - sku_code
 *               - name
 *               - category_id
 *               - brand_id
 *               - price
 *             properties:
 *               sku_code:
 *                 type: string
 *                 example: NK-1001
 *               name:
 *                 type: string
 *                 example: Nike Hoodie
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               size:
 *                 type: string
 *                 example: L
 *               color:
 *                 type: string
 *                 example: Black
 *               price:
 *                 type: number
 *                 example: 59.99
 *               discount_price:
 *                 type: number
 *                 example: 49.99
 *               stock_quantity:
 *                 type: integer
 *                 example: 20
 *               low_stock_threshold:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: Premium hoodie
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created
 */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  productController.createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (with optional image upload)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sku_code:
 *                 type: string
 *               name:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               brand_id:
 *                 type: integer
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *               price:
 *                 type: number
 *               discount_price:
 *                 type: number
 *               stock_quantity:
 *                 type: integer
 *               low_stock_threshold:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
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
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete(
  "/:id",
  authMiddleware,
  productController.deleteProduct
);

module.exports = router;
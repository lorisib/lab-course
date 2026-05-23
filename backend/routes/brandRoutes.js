const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authMiddleware, brandController.getAllBrands);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get brand by id
 *     tags: [Brands]
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
router.get("/:id", authMiddleware, brandController.getBrandById);

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               country_of_origin:
 *                 type: string
 *               logo_url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authMiddleware, brandController.createBrand);

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update brand
 *     tags: [Brands]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nike
 *               country_of_origin:
 *                 type: string
 *                 example: USA
 *               logo_url:
 *                 type: string
 *                 example: https://logo.com/nike.png
 *               description:
 *                 type: string
 *                 example: Sportswear brand
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", authMiddleware, brandController.updateBrand);
/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete brand
 *     tags: [Brands]
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
 *         description: Deleted
 */
router.delete("/:id", authMiddleware, brandController.deleteBrand);

module.exports = router;
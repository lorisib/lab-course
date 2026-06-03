const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const uploadBrand = require("../middleware/uploadBrand");

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management module
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
 *         description: List of brands
 */
router.get(
  "/",
  authMiddleware,
  brandController.getAllBrands
);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get brand by ID
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
 *         description: Brand found
 *       404:
 *         description: Not found
 */
router.get(
  "/:id",
  authMiddleware,
  brandController.getBrandById
);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               country_of_origin:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, deleted]
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created
 */
router.post(
  "/",
  authMiddleware,
  requireRole(["Admin", "Manager"]),
  uploadBrand.single("logo"),
  brandController.createBrand
);

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country_of_origin:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive, deleted]
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated
 *       404:
 *         description: Not found
 */
router.put(
  "/:id",
  authMiddleware,
  requireRole(["Admin", "Manager"]),
  uploadBrand.single("logo"),
  brandController.updateBrand
);

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
 *         description: Brand deleted
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["Admin", "Manager"]),
  brandController.deleteBrand
);

module.exports = router;
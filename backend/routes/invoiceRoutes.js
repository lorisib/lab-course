const express = require("express");
const router = express.Router();

const invoiceController = require("../controllers/invoiceController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice Management
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get(
  "/",
  authMiddleware,
  invoiceController.getAllInvoices
);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
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
 *         description: Invoice details
 *       404:
 *         description: Invoice not found
 */
router.get(
  "/:id",
  authMiddleware,
  invoiceController.getInvoiceById
);

/**
 * @swagger
 * /api/invoices/download/{id}:
 *   get:
 *     summary: Download invoice PDF
 *     tags: [Invoices]
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
 *         description: PDF downloaded
 *       404:
 *         description: Invoice not found
 */
router.get(
  "/download/:id",
  authMiddleware,
  invoiceController.downloadInvoice
);

module.exports = router;
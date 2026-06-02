const Sale = require("../models/Sales");
const SaleDetails = require("../models/SaleDetails");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const LoyaltyCard = require("../models/LoyaltyCard");
const Invoice = require("../models/Invoice");
const { generateInvoicePDF } = require("../utils/invoiceGenerator");
const { getActiveDiscount, applyDiscount } = require("../utils/discountHelper");
const { logActivity } = require("../utils/activityLogger");
const { checkLowStock } = require("./lowStockController");

// =====================
// POINTS LOGIC
// =====================
const calculatePoints = (total) => {
  return Math.floor(Number(total) / 10);
};

// =====================
// CREATE SALE
// =====================
exports.createSale = async (req, res) => {
  try {
    const { customer_id, user_id, items } = req.body;

    // VALIDATION
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const invoice_number = "INV-" + Date.now();

    let total = 0;

    // CREATE SALE HEADER
    const sale = await Sale.create({
      customer_id,
      user_id,
      invoice_number,
      total_amount: 0
    });

    const invoiceItems = [];

    // =====================
    // LOOP ITEMS
    // =====================
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product_id}`
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity"
        });
      }

      // =====================
      // DISCOUNT LOGIC
      // =====================
      let finalPrice = Number(product.price);

      const discount = await getActiveDiscount(product);

      if (discount) {
        finalPrice = applyDiscount(finalPrice, discount);
      }

      const lineTotal = finalPrice * Number(item.quantity);

      total += lineTotal;

      // SALE DETAILS
      await SaleDetails.create({
        sale_id: sale.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: finalPrice,
        total: lineTotal
      });

      // STOCK UPDATE
      await product.update({
        stock_quantity: product.stock_quantity - item.quantity
      });

      await checkLowStock(product);

      // INVOICE ITEMS
      invoiceItems.push({
        name: product.name,
        quantity: item.quantity,
        price: finalPrice,
        total: lineTotal
      });
    }

    // =====================
    // LOYALTY CARD
    // =====================
    const card = await LoyaltyCard.findOne({
      where: { customer_id }
    });

    if (card) {
      const points = calculatePoints(total);

      card.total_points = Number(card.total_points || 0) + points;

      if (card.total_points >= 1000) card.level = "Platinum";
      else if (card.total_points >= 500) card.level = "Gold";
      else if (card.total_points >= 200) card.level = "Silver";
      else card.level = "Bronze";

      await card.save();
    }

    // =====================
    // UPDATE SALE TOTAL
    // =====================
    await sale.update({ total_amount: total });

    // =====================
    // INVOICE GENERATION
    // =====================
    const pdfPath = await generateInvoicePDF({
      sale,
      customer,
      items: invoiceItems,
      total
    });

    await Invoice.create({
      sale_id: sale.id,
      invoice_number,
      pdf_path: pdfPath,
      generated_by_user_id: user_id,
      generated_at: new Date()
    });

    // =====================
    // LOG
    // =====================
    await logActivity({
      user_id,
      action_type: "SALE_CREATED",
      entity_name: "Sales",
      entity_id: sale.id,
      description: "Sale created with invoice",
      ip_address: req.ip
    });

    return res.status(201).json({
      message: "Sale created successfully",
      saleId: sale.id,
      invoice_number,
      total
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// =====================
// GET ALL SALES
// =====================
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// =====================
// GET BY ID
// =====================
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// =====================
// DELETE SALE
// =====================
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    await sale.destroy();

    res.json({
      message: "Sale deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
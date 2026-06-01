const Sale = require("../models/Sales");
const SaleDetails = require("../models/SaleDetails");
const Product = require("../models/Product");
const { Customer, LoyaltyCard } = require("../models");

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

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items provided"
      });
    }

    // CHECK CUSTOMER
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(400).json({
        message: "Customer not found"
      });
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

    // =====================
    // ITEMS LOOP
    // =====================
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return res.status(400).json({
          message: `Product not found: ${item.product_id}`
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({
          message: "Invalid quantity"
        });
      }

      const lineTotal =
        Number(product.price) * Number(item.quantity);

      total += lineTotal;

      await SaleDetails.create({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
        total: lineTotal
      });

      // UPDATE STOCK
      await product.update({
        stock_quantity:
          product.stock_quantity - item.quantity
      });

      await checkLowStock(product);
    }

    // =====================
    // LOYALTY CARD UPDATE
    // =====================
    const card = await LoyaltyCard.findOne({
      where: { customer_id }
    });

    if (card) {
      const points = calculatePoints(total);

      card.total_points =
        Number(card.total_points || 0) + points;

      if (card.total_points >= 1000) {
        card.level = "Platinum";
      } else if (card.total_points >= 500) {
        card.level = "Gold";
      } else if (card.total_points >= 200) {
        card.level = "Silver";
      } else {
        card.level = "Bronze";
      }

      await card.save();
    }

    // =====================
    // FINAL UPDATE SALE
    // =====================
    await sale.update({
      total_amount: total
    });

    // =====================
    // LOG ACTIVITY
    // =====================
    await logActivity({
      user_id,
      action_type: "SALE_COMPLETED",
      entity_name: "Sales",
      entity_id: sale.id,
      description: "Sale completed",
      ip_address: req.ip
    });

    return res.status(201).json({
      message: "Sale created successfully",
      saleId: sale.id,
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
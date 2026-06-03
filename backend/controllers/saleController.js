const Sale = require("../models/Sales");
const SaleDetails = require("../models/SaleDetails");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const LoyaltyCard = require("../models/LoyaltyCard");
const Invoice = require("../models/Invoice");
const { generateInvoicePDF } = require("../utils/invoiceGenerator");
const { logActivity } = require("../utils/activityLogger");
const { checkLowStock } = require("./lowStockController");

const { Discount, ProductDiscount } = require("../models");

// POINTS
const calculatePoints = (total) => {
  return Math.floor(Number(total) / 10);
};

// CREATE SALE
exports.createSale = async (req, res) => {
  try {
    const { customer_id, user_id, items } = req.body;

    if (!items?.length) {
      return res.status(400).json({ message: "Items are required" });
    }

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const sale = await Sale.create({
      customer_id,
      user_id,
      invoice_number: "INV-" + Date.now(),
      total_amount: 0
    });

    let total = 0;
    const invoiceItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return res.status(404).json({
          message: `Product not found ${item.product_id}`
        });
      }

      if (item.quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      // STOCK
      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      let finalPrice = Number(product.price);

      // DISCOUNT
      const discountLink = await ProductDiscount.findOne({
        where: { product_id: product.id },
        include: [
          {
            model: Discount
          }
        ]
      });

      if (discountLink?.Discount) {
        const d = discountLink.Discount;

        if (d.discount_type === "percentage") {
          finalPrice -= (finalPrice * d.value) / 100;
        }

        if (d.discount_type === "fixed") {
          finalPrice -= d.value;
        }

        if (finalPrice < 0) finalPrice = 0;
      }

      const lineTotal = finalPrice * item.quantity;
      total += lineTotal;

      await SaleDetails.create({
        sale_id: sale.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: finalPrice,
        total: lineTotal
      });

      await product.update({
        stock_quantity: product.stock_quantity - item.quantity
      });

      await checkLowStock(product);

      invoiceItems.push({
        name: product.name,
        quantity: item.quantity,
        price: finalPrice,
        total: lineTotal
      });
    }

    await sale.update({ total_amount: total });

const card = await LoyaltyCard.findOne({ where: { customer_id } });

if (card) {
  const pointsToAdd = Math.floor(total / 10);

  const newPoints = Number(card.total_points || 0) + pointsToAdd;

  let level = "Bronze";
  if (newPoints >= 1000) level = "Platinum";
  else if (newPoints >= 500) level = "Gold";
  else if (newPoints >= 200) level = "Silver";

  await card.update({
    total_points: newPoints,
    level
  });
}
    const pdfPath = await generateInvoicePDF({
      sale,
      customer,
      items: invoiceItems,
      total
    });

    await Invoice.create({
      sale_id: sale.id,
      invoice_number: sale.invoice_number,
      pdf_path: pdfPath,
      generated_by_user_id: user_id,
      generated_at: new Date()
    });

    await logActivity({
      user_id,
      action_type: "SALE_CREATED",
      entity_name: "Sales",
      entity_id: sale.id,
      description: "Sale created",
      ip_address: req.ip
    });

    res.status(201).json({
      message: "Sale created successfully",
      saleId: sale.id,
      total
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
// GET ALL SALES
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: ["first_name", "last_name"]
        },
        {
          model: SaleDetails,
          include: [
            {
              model: Product
            }
          ]
        }
      ],
      order: [["id", "DESC"]]
    });

    res.json(sales);
  } catch (error) {
    console.log("SALES ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};
// GET BY ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [SaleDetails]
    });

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE SALE
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await SaleDetails.destroy({ where: { sale_id: sale.id } });
    await sale.destroy();

    res.json({ message: "Sale deleted" });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
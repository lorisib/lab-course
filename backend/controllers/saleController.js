const Sale = require("../models/Sales");
const SaleDetails = require("../models/SaleDetails");
const Product = require("../models/Product");

exports.createSale = async (req, res) => {
  try {
    const { customer_id, user_id, items } = req.body;

    const invoice_number = "INV-" + Date.now();

    let total = 0;

    const sale = await Sale.create({
      customer_id,
      user_id,
      invoice_number,
    });

    for (let item of items) {
      const product = await Product.findByPk(item.product_id);

      const lineTotal = product.price * item.quantity;
      total += lineTotal;

      await SaleDetails.create({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.price,
        total: lineTotal,
      });

      // ZBRIT STOCK
      await product.update({
        stock_quantity: product.stock_quantity - item.quantity,
      });
    }

    await sale.update({
      total_amount: total,
    });

    res.status(201).json({
      message: "Sale created",
      saleId: sale.id,
      total,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    res.json(sale);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteSale = async (req, res) => {
  try {
    await Sale.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
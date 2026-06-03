const PurchaseOrder = require("../models/PurchaseOrder");
const PurchaseOrderDetails = require("../models/PurchaseOrderDetails");
const Product = require("../models/Product");

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { supplier_id, ordered_by_user_id, items } = req.body;

    const order_number = "PO-" + Date.now();

    let total = 0;

    const order = await PurchaseOrder.create({
      supplier_id,
      ordered_by_user_id,
      order_number,
      status: "received",
    });

    for (let item of items) {
      const product = await Product.findByPk(item.product_id);

      const lineTotal = item.unit_price * item.quantity;

      total += lineTotal;

      await PurchaseOrderDetails.create({
        purchase_order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: lineTotal,
      });

      // RRIT STOCKUN
      await product.update({
        stock_quantity:
          Number(product.stock_quantity) + Number(item.quantity),
      });
    }

    await order.update({
      total_amount: total,
    });

    res.status(201).json({
      message: "Purchase order created",
      purchaseOrderId: order.id,
      total,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.findAll();

    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findByPk(req.params.id);

    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    await PurchaseOrder.destroy({
      where: { id: req.params.id },
    });

    res.json({
      message: "Purchase order deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
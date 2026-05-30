const LowStockAlert = require("../models/LowStockAlert");
const Product = require("../models/Product");

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await LowStockAlert.findAll({
      order: [["id", "DESC"]],
    });

    res.json(alerts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.resolveAlert = async (req, res) => {
  try {
    const alert = await LowStockAlert.findByPk(req.params.id);

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    await alert.update({
      alert_status: "resolved",
    });

    res.json({
      message: "Alert resolved",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.checkLowStock = async (product) => {
  try {
    if (product.stock_quantity <= product.low_stock_threshold) {
      const existingAlert = await LowStockAlert.findOne({
        where: {
          product_id: product.id,
          alert_status: "active",
        },
      });

      if (!existingAlert) {
        await LowStockAlert.create({
          product_id: product.id,
          current_stock: product.stock_quantity,
          threshold_value: product.low_stock_threshold,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
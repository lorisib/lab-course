const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");
const Sale = require("../models/Sales");
const { Product } = require("../models");
const SaleDetails = require("../models/SaleDetails");
const Customer = require("../models/Customer");


exports.getKPIs = async (req, res) => {
  try {
    const totalSales = await Sale.sum("total_amount");

    const totalProducts = await Product.count();

    const totalCustomers = await Customer.count();

    const revenue = await Sale.sum("total_amount");

    const lowStockProducts = await Product.count({
      where: {
        stock_quantity: {
          [Sequelize.Op.lt]: Sequelize.col("low_stock_threshold"),
        },
      },
    });

    res.json({
      totalSales: totalSales || 0,
      totalProducts,
      totalCustomers,
      revenue,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.getMonthlySales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    console.log("SALES:", sales.length);

    const result = {};

    sales.forEach((s) => {
      let date = s.sale_date;

      if (!date) return;


      if (typeof date === "string") {
        date = new Date(date.replace(" ", "T"));
      } else {
        date = new Date(date);
      }

      if (isNaN(date.getTime())) return;

      const month = date.toLocaleString("default", {
        month: "long",
      });

      if (!result[month]) {
        result[month] = {
          month,
          totalRevenue: 0,
          totalSales: 0,
        };
      }

      result[month].totalRevenue += Number(s.total_amount || 0);
      result[month].totalSales += 1;
    });

    res.json(Object.values(result));
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getBestSellingProducts = async (req, res) => {
  try {
    const products = await SaleDetails.findAll({
      attributes: [
        "product_id",
        [
          sequelize.fn("SUM", sequelize.col("quantity")),
          "total_sold",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: ["name", "price", "stock_quantity"],
        },
      ],
      group: ["product_id"],
      order: [[sequelize.literal("total_sold"), "DESC"]],
      limit: 10,
    });

    res.json(products);
  } catch (error) {
console.log(error);

res.status(500).json({
  message: error.message,
  error: error.original || error
});  }
};
const sequelize = require("../config/db");
const { Sequelize } = require("sequelize");

const Sale = require("../models/Sales");
const SaleDetails = require("../models/SaleDetails");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

const { Op } = Sequelize;


exports.getKPIs = async (req, res) => {
  try {
    const [totalSales, totalProducts, totalCustomers, revenue, lowStockProducts] =
      await Promise.all([
        Sale.count(),
        Product.count(),
        Customer.count(),
        Sale.sum("total_amount"),
        Product.count({
          where: {
            stock_quantity: {
              [Op.lt]: Sequelize.col("low_stock_threshold"),
            },
          },
        }),
      ]);

    res.json({
      totalSales: totalSales || 0,
      totalProducts: totalProducts || 0,
      totalCustomers: totalCustomers || 0,
      revenue: revenue || 0,
      lowStockProducts: lowStockProducts || 0,
    });
  } catch (error) {
    console.log("KPIs ERROR:", error);
    res.status(500).json({ message: "Error loading KPIs" });
  }
};


exports.getMonthlySales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      attributes: ["sale_date", "total_amount"],
    });

    const result = {};

    sales.forEach((s) => {
      if (!s.sale_date) return;

      const date = new Date(s.sale_date);
      if (isNaN(date)) return;

      const month = date.toLocaleString("default", { month: "long" });

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
    console.log("MONTHLY SALES ERROR:", error);
    res.status(500).json({ message: "Error loading monthly sales" });
  }
};


exports.getBestSellingProducts = async (req, res) => {
  try {
    const products = await SaleDetails.findAll({
      attributes: [
        "product_id",
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_sold"],
      ],
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "stock_quantity"],
        },
      ],
      group: [
        "SaleDetails.product_id",
        "Product.id",
        "Product.name",
        "Product.price",
        "Product.stock_quantity",
      ],
      order: [[sequelize.literal("total_sold"), "DESC"]],
      limit: 10,
    });

    res.json(products);
  } catch (error) {
    console.log("BEST SELLING ERROR:", error);
    res.status(500).json({
      message: "Error loading best selling products",
    });
  }
};
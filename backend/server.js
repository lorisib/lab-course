const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");


require("dotenv").config();

const sequelize = require("./config/db");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const saleRoutes = require("./routes/saleRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const lowStockRoutes = require("./routes/lowStockRoutes");
const cookieParser = require("cookie-parser");
const loyaltyCardRoutes = require("./routes/loyaltyCardRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const discountRoutes = require("./routes/discountRoutes");
const productDiscountRoutes = require("./routes/productDiscountRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Clothing Store API is running");
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

  app.use("/api/auth", authRoutes);//e maron swagger.ui connection nga authRoutes.js dhe e vendos ne /api/auth

  app.use("/api/categories", categoryRoutes);//e maron swagger.ui connection nga categoryRoutes.js dhe e vendos ne /api/categories

  app.use("/api/brands", brandRoutes);//e maron swagger.ui connection nga brandRoutes.js dhe e vendos ne /api/brands
  
  app.use("/api/products", productRoutes);//e maron swagger.ui connection nga productRoutes.js dhe e vendos ne /api/products

  app.use("/api/customers", customerRoutes);//e maron swagger.ui connection nga customerRoutes.js dhe e vendos ne /api/customers

  app.use("/api/suppliers", supplierRoutes);//e maron swagger.ui connection nga supplierRoutes.js dhe e vendos ne /api/suppliers

  app.use("/api/sales", saleRoutes);//e maron swagger.ui connection nga saleRoutes.js dhe e vendos ne /api/sales

  app.use("/api/purchase-orders", purchaseOrderRoutes);//e maron swagger.ui connection nga purchaseOrderRoutes.js dhe e vendos ne /api/purchase-orders

  app.use("/api/dashboard", dashboardRoutes);//e maron swagger.ui connection nga dashboardRoutes.js dhe e vendos ne /api/dashboard

  app.use("/api/activity-logs", activityLogRoutes);//e maron swagger.ui connection nga activityLogRoutes.js dhe e vendos ne /api/activity-logs

  app.use("/api/low-stock", lowStockRoutes); //e maron swagger.ui connection nga lowStockRoutes.js dhe e vendos ne /api/low-stock

  app.use("/api/loyalty", loyaltyCardRoutes);//e maron swagger.ui connection nga loyaltyCardRoutes.js dhe e vendos ne /api/loyalty-cards

  app.use("/api/invoices", invoiceRoutes);//e maron swagger.ui connection nga invoiceRoutes.js dhe e vendos ne /api/invoices

  app.use("/api/discounts", discountRoutes);//e maron swagger.ui connection nga discountRoutes.js dhe e vendos ne /api/discounts

  app.use("/api/product-discounts", productDiscountRoutes);//e maron swagger.ui connection nga productDiscountRoutes.js dhe e vendos ne /api/product-discounts

  app.use("/uploads", express.static("uploads"));

  app.use("/invoices", express.static("invoices"));
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");


require("dotenv").config();

const sequelize = require("./config/db");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

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


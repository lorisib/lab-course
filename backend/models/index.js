const sequelize = require("../config/db");
const Sequelize = require("sequelize");

// MODELS 
const Product = require("./Product");
const Category = require("./Category");
const Brand = require("./Brand");
const Sale = require("./Sales");
const SaleDetails = require("./SaleDetails");

const User = require("./User");
const Role = require("./Role");
const UserRole = require("./UserRole");

const Customer = require("./Customer");
const LoyaltyCard = require("./LoyaltyCard");

const Supplier = require("./Supplier");
const RefreshToken = require("./RefreshToken");
const LowStockAlert = require("./LowStockAlert");
const Invoice = require("./Invoice");

const Discount = require("./Discount");
const ProductDiscount = require("./ProductDiscount");



// LIDHJET

// PRODUCT
Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

Product.belongsTo(Brand, { foreignKey: "brand_id" });
Brand.hasMany(Product, { foreignKey: "brand_id" });

// SALE
Sale.hasMany(SaleDetails, { foreignKey: "sale_id" });
SaleDetails.belongsTo(Sale, { foreignKey: "sale_id" });

Product.hasMany(SaleDetails, { foreignKey: "product_id" });
SaleDetails.belongsTo(Product, { foreignKey: "product_id" });

// USER ROLES
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
});

// CUSTOMER LOYALTY
Customer.hasOne(LoyaltyCard, { foreignKey: "customer_id" });
LoyaltyCard.belongsTo(Customer, { foreignKey: "customer_id" });

// REFRESH TOKENS
User.hasMany(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });

// LOW STOCK
Product.hasMany(LowStockAlert, { foreignKey: "product_id" });
LowStockAlert.belongsTo(Product, { foreignKey: "product_id" });

// INVOICE
Sale.hasOne(Invoice, { foreignKey: "sale_id" });
Invoice.belongsTo(Sale, { foreignKey: "sale_id" });

// DISCOUNTS
// MANY TO MANY
Product.belongsToMany(Discount, {
  through: ProductDiscount,
  foreignKey: "product_id",
  otherKey: "discount_id",
});

Discount.belongsToMany(Product, {
  through: ProductDiscount,
  foreignKey: "discount_id",
  otherKey: "product_id",
});


module.exports = {
  sequelize,
  Sequelize,

  Product,
  Category,
  Brand,
  Sale,
  SaleDetails,
  Invoice,

  User,
  Role,
  UserRole,

  Customer,
  LoyaltyCard,

  Supplier,
  RefreshToken,
  LowStockAlert,
  Discount,
  ProductDiscount,
};
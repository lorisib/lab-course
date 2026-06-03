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


// ======================
// PRODUCT RELATIONS
// ======================
Product.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Product, { foreignKey: "category_id" });

Product.belongsTo(Brand, { foreignKey: "brand_id" });
Brand.hasMany(Product, { foreignKey: "brand_id" });

ProductDiscount.belongsTo(Product, {
  foreignKey: "product_id"
});

ProductDiscount.belongsTo(Discount, {
  foreignKey: "discount_id"
});

// ======================
// SALE RELATIONS
// ======================
Sale.hasMany(SaleDetails, { foreignKey: "sale_id" });
SaleDetails.belongsTo(Sale, { foreignKey: "sale_id" });

Product.hasMany(SaleDetails, { foreignKey: "product_id" });
SaleDetails.belongsTo(Product, { foreignKey: "product_id" });


// CUSTOMER ↔ SALE
Sale.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "Customer",
});

Customer.hasMany(Sale, {
  foreignKey: "customer_id",
  as: "Sales",
});


// ======================
// USER ROLES
// ======================
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
});


// ======================
// LOYALTY
// ======================
Customer.hasOne(LoyaltyCard, { foreignKey: "customer_id" });
LoyaltyCard.belongsTo(Customer, { foreignKey: "customer_id" });


// ======================
// TOKENS
// ======================
User.hasMany(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });


// ======================
// LOW STOCK
// ======================
Product.hasMany(LowStockAlert, { foreignKey: "product_id" });
LowStockAlert.belongsTo(Product, { foreignKey: "product_id" });


// ======================
// INVOICE
// ======================
Sale.hasOne(Invoice, { foreignKey: "sale_id" });
Invoice.belongsTo(Sale, { foreignKey: "sale_id" });


// ======================
// DISCOUNTS
// ======================
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




// EXPORT
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
const Product = require("./Product");
const Category = require("./Category");
const Brand = require("./Brand");
const SaleDetails = require("./SaleDetails");

const User = require("./User");
const Role = require("./Role");
const UserRole = require("./UserRole");


// PRODUCT -> CATEGORY
Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "Category",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
});

// PRODUCT -> BRAND
Product.belongsTo(Brand, {
  foreignKey: "brand_id",
  as: "Brand",
});

Brand.hasMany(Product, {
  foreignKey: "brand_id",
});

module.exports = {
  Product,
  Category,
  Brand,
};



SaleDetails.belongsTo(Product, {
  foreignKey: "product_id",
});

Product.hasMany(SaleDetails, {
  foreignKey: "product_id",
});



// User ↔ Role (many-to-many)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    sku_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "active",
        "inactive",
        "discontinued",
        "deleted"
      ),
      defaultValue: "active",
    },
  },
  {
    tableName: "Products",
    timestamps: false,
  }
);

module.exports = Product;
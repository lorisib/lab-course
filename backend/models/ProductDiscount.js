const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProductDiscount = sequelize.define(
  "ProductDiscount",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    discount_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "ProductDiscounts",
    timestamps: false,
  }
);

module.exports = ProductDiscount;
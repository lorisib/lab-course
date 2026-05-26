const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SaleDetails = sequelize.define(
  "SaleDetails",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    unit_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
  },
  {
    tableName: "SaleDetails",
    timestamps: false,
  }
);

module.exports = SaleDetails;
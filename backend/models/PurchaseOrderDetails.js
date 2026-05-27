const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PurchaseOrderDetails = sequelize.define(
  "PurchaseOrderDetails",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    purchase_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
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
    tableName: "PurchaseOrderDetails",
    timestamps: false,
  }
);

module.exports = PurchaseOrderDetails;
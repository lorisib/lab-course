const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LowStockAlert = sequelize.define(
  "LowStockAlert",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    current_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    threshold_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    alert_status: {
      type: DataTypes.ENUM("active", "resolved"),
      defaultValue: "active",
    },
  },
  {
    tableName: "LowStockAlerts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = LowStockAlert;
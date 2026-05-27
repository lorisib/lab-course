const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PurchaseOrder = sequelize.define(
  "PurchaseOrder",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ordered_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.DECIMAL(14, 2),
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM(
        "draft",
        "sent",
        "confirmed",
        "received",
        "cancelled"
      ),
      defaultValue: "draft",
    },
  },
  {
    tableName: "PurchaseOrders",
    timestamps: false,
  }
);

module.exports = PurchaseOrder;
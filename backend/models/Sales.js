const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total_amount: {
      type: DataTypes.DECIMAL(14, 2),
      defaultValue: 0,
    },

    payment_method: {
      type: DataTypes.ENUM("cash", "card", "bank_transfer", "mobile"),
      defaultValue: "cash",
    },

    sale_status: {
      type: DataTypes.ENUM("completed", "returned", "cancelled"),
      defaultValue: "completed",
    },


    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Sales",
    timestamps: false,
  }
);

module.exports = Sale;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Discount = sequelize.define(
  "Discount",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    discount_type: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },

    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "expired"),
      defaultValue: "active",
    },
  },
  {
    tableName: "Discounts",
    timestamps: false,
  }
);

module.exports = Discount;
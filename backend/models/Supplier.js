const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Supplier = sequelize.define(
  "Supplier",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    company_name: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },

    contact_person: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(180),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "active",
        "inactive",
        "blacklisted",
        "deleted"
      ),
      defaultValue: "active",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Suppliers",
    timestamps: false,
  }
);

module.exports = Supplier;
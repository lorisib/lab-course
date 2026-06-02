const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    sale_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false
    },

    pdf_path: {
      type: DataTypes.STRING,
      allowNull: true
    },

    generated_by_user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    generated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "Invoices",
    timestamps: false
  }
);

module.exports = Invoice;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,

    total_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "blacklisted"),
      defaultValue: "active",
    },
  },
  {
    tableName: "Customers",
    timestamps: false,
  }
);

Customer.associate = (models) => {
  Customer.hasMany(models.Sale, {
    foreignKey: "customer_id",
    as: "Sales",
  });
};
module.exports = Customer;
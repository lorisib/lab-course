const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define(
  "Brand",
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

    country_of_origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "deleted"),
      defaultValue: "active",
    },
  },
  {
    tableName: "Brands",
    timestamps: false,
  }
);

module.exports = Brand;
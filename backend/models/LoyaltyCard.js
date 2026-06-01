const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LoyaltyCard = sequelize.define(
  "LoyaltyCard",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    customer_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    total_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    level: {
      type: DataTypes.ENUM("Bronze", "Silver", "Gold", "Platinum"),
      defaultValue: "Bronze",
    },

    issue_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },

    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    tableName: "LoyaltyCards",
    timestamps: false,
  }
);

module.exports = LoyaltyCard;
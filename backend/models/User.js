const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(180),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  email_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lockout_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  access_failed_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "suspended", "deleted"),
    defaultValue: "active",
  },
}, {
  tableName: "Users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = User;
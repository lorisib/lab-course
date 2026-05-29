const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    action_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    entity_name: {
      type: DataTypes.STRING,
    },

    entity_id: {
      type: DataTypes.INTEGER,
    },

    description: {
      type: DataTypes.TEXT,
    },

    ip_address: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "ActivityLogs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = ActivityLog;
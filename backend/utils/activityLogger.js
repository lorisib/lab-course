const ActivityLog = require("../models/ActivityLog");

exports.logActivity = async ({
  user_id,
  action_type,
  entity_name,
  entity_id,
  description,
  ip_address,
}) => {
  try {
    await ActivityLog.create({
      user_id,
      action_type,
      entity_name,
      entity_id,
      description,
      ip_address,
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};
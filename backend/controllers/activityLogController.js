const ActivityLog = require("../models/ActivityLog");

exports.getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.findAll({
      order: [["id", "DESC"]],
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json(error);
  }
};
const Role = require("../models/Role");
const User = require("../models/User");

const requireRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: Role,
      });

      const userRoles = user.Roles.map(r => r.name);

      const hasRole = roles.some(r => userRoles.includes(r));

      if (!hasRole) {
        return res.status(403).json({
          message: "Nuk ke leje për këtë veprim",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = requireRole;
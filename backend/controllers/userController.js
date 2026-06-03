const User = require("../models/User");
const Role = require("../models/Role");
const UserRole = require("../models/UserRole");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE ROLE
exports.updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role_id } = req.body;

    if (!role_id) {
      return res.status(400).json({ message: "role_id is required" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // fshi rolet ekzistuese
    await UserRole.destroy({
      where: { user_id: userId },
    });

    // krijo rolin e ri
    await UserRole.create({
      user_id: userId,
      role_id,
    });

    res.json({ message: "Role updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    await user.update({
      status: "inactive",
    });

    res.json({
      message: "User deactivated (soft delete)",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
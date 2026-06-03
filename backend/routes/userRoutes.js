const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");


 //GET ALL USERS viq admini
router.get(
  "/",
  authMiddleware,
  requireRole(["Admin"]),
  userController.getAllUsers
);


 //UPDATE ROLE
router.put(
  "/:id/role",
  authMiddleware,
  requireRole(["Admin"]),
  userController.updateUserRole
);

 // DELETE USER
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["Admin"]),
  userController.deleteUser
);

module.exports = router;
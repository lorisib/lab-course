const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const UserRole = require("../models/UserRole");
const RefreshToken = require("../models/RefreshToken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const { logActivity } = require("../utils/activityLogger");


// ===================== REGISTER
exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash,
      phone_number,
      email_confirmed: true,
      status: "active",
    });

    const userRole = await Role.findOne({
      where: { normalized_name: "USER" },
    });

    await UserRole.create({
      user_id: user.id,
      role_id: userRole.id,
    });

    const accessToken = generateAccessToken(user, ["User"]);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await logActivity({
      user_id: user.id,
      action_type: "USER_CREATED",
      entity_name: "Users",
      entity_id: user.id,
      description: "User registered",
      ip_address: req.ip,
    });

    res.status(201).json({
      message: "Register successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===================== LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: Role,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account inactive" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const roles = user.Roles.map(r => r.name);

    const accessToken = generateAccessToken(user, roles);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false, 
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    await logActivity({
      user_id: user.id,
      action_type: "LOGIN_SUCCESS",
      entity_name: "Users",
      entity_id: user.id,
      description: "User logged in",
      ip_address: req.ip,
    });

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roles,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const storedToken = await RefreshToken.findOne({
      where: { token, is_revoked: false },
    });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: Role,
    });

    const roles = user.Roles.map(r => r.name);

    const newAccessToken = generateAccessToken(user, roles);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({
      message: "Refresh token expired",
    });
  }
};


// ===================== ME
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: Role,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      roles: user.Roles ? user.Roles.map(r => r.name) : [],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===================== LOGOUT
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    await RefreshToken.update(
      { is_revoked: true },
      { where: { token: refreshToken } }
    );

    res.clearCookie("refreshToken");

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { logActivity } = require("../utils/activityLogger");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Ky email ekziston tashmë" });
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

    const token = generateToken(user);

    await logActivity({
      user_id: user.id,
      action_type: "USER_REGISTER",
      entity_name: "Users",
      entity_id: user.id,
      description: "New user registered",
      ip_address: req.ip,
});


    res.status(201).json({
      message: "Përdoruesi u regjistrua me sukses",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gabim gjatë regjistrimit",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email ose password gabim" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Llogaria nuk është aktive" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Email ose password gabim" });
    }

    const token = generateToken(user);



await logActivity({
  user_id: user.id,
  action_type: "LOGIN_SUCCESS",
  entity_name: "Users",
  entity_id: user.id,
  description: "User logged in",
  ip_address: req.ip,
});



    res.json({
      message: "Login i suksesshëm",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gabim gjatë login",
      error: error.message,
    });
  }
};
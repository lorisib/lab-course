const jwt = require("jsonwebtoken");

const generateAccessToken = (user, roles = []) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
const { Discount } = require("../models");

// CREATE
exports.createDiscount = async (req, res) => {
  try {
    const discount = await Discount.create(req.body);
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllDiscounts = async (req, res) => {
  try {
    const data = await Discount.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
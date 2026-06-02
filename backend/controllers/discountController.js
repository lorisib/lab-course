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
//update
exports.updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    await discount.update(req.body);

    res.json({
      message: "Discount updated successfully",
      data: discount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete
exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    await discount.destroy();

    res.json({
      message: "Discount deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
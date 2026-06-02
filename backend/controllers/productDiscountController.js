const { ProductDiscount } = require("../models");

// ASSIGN DISCOUNT TO PRODUCT
exports.assignDiscount = async (req, res) => {
  try {
    const { product_id, discount_id } = req.body;

    const result = await ProductDiscount.create({
      product_id,
      discount_id
    });

    res.json({
      message: "Discount assigned",
      data: result
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
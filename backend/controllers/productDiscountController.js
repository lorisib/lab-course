const Product = require("../models/Product");
const Discount = require("../models/Discount");
const ProductDiscount = require("../models/ProductDiscount");

exports.assignDiscount = async (req, res) => {
  try {
    const { product_id, discount_id } = req.body;

    if (!product_id || !discount_id) {
      return res.status(400).json({ message: "Missing data" });
    }

    const product = await Product.findByPk(product_id);
    const discount = await Discount.findByPk(discount_id);

    if (!product || !discount) {
      return res.status(404).json({
        message: "Product or Discount not found"
      });
    }

    const result = await ProductDiscount.create({
      product_id,
      discount_id
    });

    res.json({
      message: "Discount assigned",
      data: result
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
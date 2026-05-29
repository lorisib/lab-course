const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    await logActivity({
  user_id: req.user.id,
  action_type: "PRODUCT_CREATED",
  entity_name: "Products",
  entity_id: product.id,
  description: "Product created",
  ip_address: req.ip,
});

    res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.update(req.body);

    await logActivity({
  user_id: req.user.id,
  action_type: "PRODUCT_UPDATED",
  entity_name: "Products",
  entity_id: product.id,
  description: "Product updated",
  ip_address: req.ip,
});

    res.json({
      message: "Product updated",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    await logActivity({
  user_id: req.user.id,
  action_type: "PRODUCT_DELETED",
  entity_name: "Products",
  entity_id: product.id,
  description: "Product deleted",
  ip_address: req.ip,
});

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
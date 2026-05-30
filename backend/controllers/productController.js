const Product = require("../models/Product");
const { logActivity } = require("../utils/activityLogger");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      sku_code: req.body.sku_code,
      name: req.body.name,
      category_id: req.body.category_id,
      brand_id: req.body.brand_id,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      discount_price: req.body.discount_price,
      stock_quantity: req.body.stock_quantity || 0,
      low_stock_threshold: req.body.low_stock_threshold ?? 5,
      image_url: req.body.image_url,
      description: req.body.description,
      status: req.body.status || "active"
    });

    await logActivity({
      user_id: req.user.id,
      action_type: "PRODUCT_CREATED",
      entity_name: "Products",
      entity_id: product.id,
      description: `Created product ${product.name}`,
      ip_address: req.ip
    });

    res.status(201).json({
      message: "Product created",
      data: product
    });

  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message,
    errors: error.errors || error.original
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
      message: error.message
    });
  }
};

// GET BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.update({
      sku_code: req.body.sku_code,
      name: req.body.name,
      category_id: req.body.category_id,
      brand_id: req.body.brand_id,
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      discount_price: req.body.discount_price,
      stock_quantity: req.body.stock_quantity,
      low_stock_threshold: req.body.low_stock_threshold,
      image_url: req.body.image_url,
      description: req.body.description,
      status: req.body.status
    });

    await logActivity({
      user_id: req.user.id,
      action_type: "PRODUCT_UPDATED",
      entity_name: "Products",
      entity_id: product.id,
      description: `Updated product ${product.name}`,
      ip_address: req.ip
    });

    res.json({
      message: "Product updated",
      data: product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await product.destroy();

    await logActivity({
      user_id: req.user.id,
      action_type: "PRODUCT_DELETED",
      entity_name: "Products",
      entity_id: product.id,
      description: `Deleted product ${product.name}`,
      ip_address: req.ip
    });

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
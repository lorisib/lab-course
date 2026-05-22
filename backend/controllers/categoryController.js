const Category = require("../models/Category");

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      message: "Category created",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Not found" });
    }

    await category.update(req.body);

    res.json({
      message: "Category updated",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Not found" });
    }

    await category.destroy();

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
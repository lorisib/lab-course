const Brand = require("../models/Brand");

// CREATE
exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);

    res.status(201).json({
      message: "Brand created",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();

    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    await brand.update(req.body);

    res.json({
      message: "Brand updated",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    await brand.destroy();

    res.json({
      message: "Brand deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
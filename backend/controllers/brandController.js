const path = require("path");
const fs = require("fs");
const Brand = require("../models/Brand");

// CREATE
exports.createBrand = async (req, res) => {
  try {
    const { name, country_of_origin, description, status } = req.body;

    const logo = req.file
      ? `brand-logos/${req.file.filename}`
      : null;

    const brand = await Brand.create({
      name,
      country_of_origin,
      description,
      status,
      logo_url: logo,
    });

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
      return res.status(404).json({ message: "Brand not found" });
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
      return res.status(404).json({ message: "Brand not found" });
    }

    const newLogo = req.file
      ? `brand-logos/${req.file.filename}`
      : brand.logo_url;

    await brand.update({
      ...req.body,
      logo_url: newLogo,
    });

    res.json({
      message: "Brand updated",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE (fshin edhe file nga disku)
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // fshi logo nga disk
    if (brand.logo_url) {
      const filePath = path.join(__dirname, "../", brand.logo_url);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await brand.destroy();

    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
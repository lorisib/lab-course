const db = require("../config/db");

exports.createSupplier = async (req, res) => {
  try {
    const {
      company_name,
      contact_person,
      email,
      phone,
      address,
      city,
      country,
      status,
    } = req.body;

    await db.query(
      `
      INSERT INTO Suppliers
      (
        company_name,
        contact_person,
        email,
        phone,
        address,
        city,
        country,
        status
      )
      VALUES
      (
        :company_name,
        :contact_person,
        :email,
        :phone,
        :address,
        :city,
        :country,
        :status
      )
      `,
      {
        replacements: {
          company_name,
          contact_person,
          email,
          phone,
          address,
          city,
          country,
          status: status || "active",
        },
      }
    );

    res.status(201).json({
      message: "Supplier created successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Suppliers");

    res.json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM Suppliers WHERE id = :id",
      {
        replacements: {
          id: req.params.id,
        },
      }
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const {
      company_name,
      contact_person,
      email,
      phone,
      address,
      city,
      country,
      status,//statusi mund te jete active, inactive, blacklisted, deleted
    } = req.body;

    await db.query(
      `
      UPDATE Suppliers
      SET
        company_name = :company_name,
        contact_person = :contact_person,
        email = :email,
        phone = :phone,
        address = :address,
        city = :city,
        country = :country,
        status = :status
      WHERE id = :id
      `,
      {
        replacements: {
          id: req.params.id,
          company_name,
          contact_person,
          email,
          phone,
          address,
          city,
          country,
          status,
        },
      }
    );

    res.json({
      message: "Supplier updated successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM Suppliers WHERE id = :id",
      {
        replacements: {
          id: req.params.id,
        },
      }
    );

    res.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
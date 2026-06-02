const db = require("../config/db");


// CREATE SUPPLIER

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
      INSERT INTO Suppliers (
        company_name,
        contact_person,
        email,
        phone,
        address,
        city,
        country,
        status
      )
      VALUES (
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
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL SUPPLIERS

exports.getAllSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM Suppliers
      WHERE status != 'deleted'
      ORDER BY id DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SUPPLIER BY ID

exports.getSupplierById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `
      SELECT *
      FROM Suppliers
      WHERE id = :id
      LIMIT 1
      `,
      {
        replacements: {
          id: req.params.id,
        },
      }
    );

    if (!rows.length) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE SUPPLIER

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
      status,
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
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE SUPPLIER 

exports.deleteSupplier = async (req, res) => {
  try {
    await db.query(
      `
      UPDATE Suppliers
      SET status = 'deleted'
      WHERE id = :id
      `,
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
    res.status(500).json({
      message: error.message,
    });
  }
};
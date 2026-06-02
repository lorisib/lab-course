
const fs = require("fs");
const path = require("path");

exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    return res.download(invoice.pdf_path);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const Invoice = require("../models/Invoice");

// GET ALL
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.pdf_path) {

      // FIX PATH CLEANING
      const cleanPath = invoice.pdf_path.replace(/^\/+/, "");

      const filePath = path.join(__dirname, "../", cleanPath);

      console.log("Deleting file:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.log("File not found on disk");
      }
    }

    await invoice.destroy();

    res.json({ message: "Invoice deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DOWNLOAD PDF
exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.download(invoice.pdf_path);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
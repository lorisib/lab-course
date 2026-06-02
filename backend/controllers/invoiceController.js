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
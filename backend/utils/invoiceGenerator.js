const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

exports.generateInvoicePDF = async ({
  sale,
  customer,
  items,
  total
}) => {
  const invoicesDir = path.join(__dirname, "../invoices");

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const fileName = `invoice-${sale.invoice_number}.pdf`;

  const filePath = path.join(invoicesDir, fileName);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // HEADER
      doc
        .fontSize(20)
        .text("INVOICE", { align: "center" });

      doc.moveDown();

      // INFO
      doc.fontSize(12);
      doc.text(`Invoice Number: ${sale.invoice_number}`);
      doc.text(
        `Customer: ${customer.first_name} ${customer.last_name}`
      );
      doc.text(`Date: ${new Date().toLocaleString()}`);

      doc.moveDown();

      // TABLE HEADER
      doc.fontSize(12).text("Items:");
      doc.moveDown(0.5);

      // ITEMS
      items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} | Qty: ${item.quantity} | Price: ${item.price} | Total: ${item.total}`
        );
      });

      doc.moveDown();

      // TOTAL
      doc.fontSize(14).text(`TOTAL: ${total} EUR`, {
        align: "right"
      });

      doc.moveDown(2);

      doc.fontSize(10).text("Thank you for your purchase!", {
        align: "center"
      });

      doc.end();

      stream.on("finish", () => {
      resolve(`invoices/${fileName}`);
      });

      stream.on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};
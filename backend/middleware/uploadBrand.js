const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dir = "brand-logos";

// krijo folderin nese nuk ekziston
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

const uploadBrand = multer({ storage, fileFilter });

module.exports = uploadBrand;
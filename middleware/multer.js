const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),

  // Removed file filter in order to upload both .jpg and .docx files. 
  // Was not working before, will add file filters later.

  
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext.toLowerCase() !== ".jpg" && ext.toLowerCase() !== ".jpeg" && ext.toLowerCase() !== ".png" && ext.toLowerCase() !== ".doc" && ext.toLowerCase() !== ".docx") {
      console.log(ext)
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

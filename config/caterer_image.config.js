//middleware for handling multipart/form-data
const multer = require("multer");
//built-in module To handle file paths
var path = require("path");
//file storage configuration
const storage = multer.diskStorage({
  //setting destination to save the file on the server
  destination: (req, file, cb) => {
    //directory to the file
    cb(null, __basedir + "/images/");
  },
  //setting filename for the uploaded file
  filename: (req, file, cb) => {
    cb(
      null,
      //fieldname is image + - + epochtime + uploaded file extention
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
//file filter configuration
const fileFilter = (req, file, cb) => {
  //accept files only with png, jpg or jpge
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//multer configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });
//export it as a module
module.exports = upload;

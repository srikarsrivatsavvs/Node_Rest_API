const multer = require('multer');
var path = require('path');

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, __basedir + '/images/');
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const upload = multer({storage: storage});

    module.exports = upload;
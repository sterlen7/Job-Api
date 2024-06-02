const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'PPuploads', 
        allowedFormats: ['jpg', 'jpeg', 'png'], 
        transformation: [{ width: 500, height: 500, crop: 'limit' }] 
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SEC,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `${req.user.id}_profile_picture`, 
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

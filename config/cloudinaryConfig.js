const cloudinary =  require ('cloudinary')
require('dotenv').config();


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SEC
})


module.exports = cloudinary


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();
// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'event-hub/events', // Organize uploads in a specific folder
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Allowed image formats
        // No transformation during upload for better performance
        // Images will be optimized automatically by Cloudinary on delivery
    },
});

module.exports = { cloudinary, storage };

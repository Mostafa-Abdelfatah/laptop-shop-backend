const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => {
      const folder =  req.baseUrl.includes('user') ? 'user-images' : 'laptop-images';
      return folder;
    },
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ quality: 'auto' }]
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
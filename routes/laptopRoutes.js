const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController')
const upload = require('../utils/cloudinaryStorage')

router.get('/getLaptopById/:id', laptopController.getLaptopById);
router.get('/getAllLaptops', laptopController.getAllLaptops);



router.post('/addLaptop',upload.single('photo'), laptopController.addLaptop);
router.post('/uploadLaptopImage/:id', upload.single('photo'), laptopController.uploadLaptopImage);

router.put('/updateLaptopById/:id', laptopController.updateLaptopById);
router.delete('/deleteLaptopById/:id', laptopController.deleteLaptopById);

module.exports = router;
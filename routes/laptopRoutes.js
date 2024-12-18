const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController')

router.get('/getLaptopById/:id', laptopController.getLaptopById);
router.get('/getAllLaptops', laptopController.getAllLaptops);
router.get('/getLaptopsByName/:name', laptopController.getLaptopsByName);
router.get('/getLaptopsByCategoryId/:id', laptopController.getLaptopsByCategoryId);
router.get('/getLaptopsByBrandId/:id', laptopController.getLaptopsByBrandId);


router.post('/addLaptop', laptopController.addLaptop);

router.put('/updateLaptopById/:id', laptopController.updateLaptopById);
router.delete('/deleteLaptopById/:id', laptopController.deleteLaptopById);

module.exports = router;
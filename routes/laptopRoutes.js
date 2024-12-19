const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptopController')

router.get('/getLaptopById/:id', laptopController.getLaptopById);
router.get('/getAllLaptops', laptopController.getAllLaptops);
router.get('/getLaptopsByName/:name', laptopController.getLaptopsByName);

router.post('/addLaptop', laptopController.addLaptop);

router.put('/updateLaptopById/:id', laptopController.updateLaptopById);
router.delete('/deleteLaptopById/:id', laptopController.deleteLaptopById);

module.exports = router;
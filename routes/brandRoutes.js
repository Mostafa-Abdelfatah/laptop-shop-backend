const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');


router.post('/addBrand', brandController.addBrand);

router.get('/getAllBrands', brandController.getAllBrands);
router.get('/getBrandById/:id', brandController.getBrandById);
router.get('/getBrandsByName/:name', brandController.getBrandsByName);

router.put('/updateBrandById/:id', brandController.updateBrandById);

router.delete('/deleteBrandById/:id', brandController.deleteBrandById);
router.delete('/deleteBrandByName/:name', brandController.deleteBrandByName);

module.exports = router;
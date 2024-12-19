const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');

router.post('/addRate', rateController.addRate);

router.get('/getAllRates', rateController.getAllRates);
router.get('/getRateById/:id', rateController.getRateById);
router.get('/getRatesByUserId/:user_id', rateController.getRatesByUserId);
router.get('/getRatesByLaptopId/:laptop_id', rateController.getRatesByLaptopId);

router.put('/updateRateById/:id', rateController.updateRateById);

router.delete('/deleteRateById/:id', rateController.deleteRateById);

module.exports = router;

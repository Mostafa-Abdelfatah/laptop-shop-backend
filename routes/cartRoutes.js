const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/addCart', cartController.addCart);

router.get('/getAllCarts', cartController.getAllCarts);
router.get('/getCartById/:id', cartController.CartById);
router.get('/getCartByUserId/:id', cartController.CartByUserId);

router.delete('/deleteCartById/:id', cartController.deleteCartById);


module.exports = router;
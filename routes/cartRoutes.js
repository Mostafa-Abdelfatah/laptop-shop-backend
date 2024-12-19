const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/addCart', cartController.addCart);

// router.get('/getAllCarts', cartController.getAllCarts);
// router.get('/getCartById/:id', cartController.CartById);
// router.get('/getCartsByName/:name', cartController.getCartsByName);

// router.put('/updateCartById/:id', cartController.updateCartById);

// router.delete('/deleteCartById/:id', cartController.deleteCartById);
// router.delete('/deleteCartByName/:name', cartController.deleteCartByName);

module.exports = router;
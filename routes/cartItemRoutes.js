const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');


router.post('/addCartItem', cartItemController.addCartItem);
router.get('/getAllcartItem', cartItemController.AllCartItems);
router.put('/updateCartItemById/:id', cartItemController.updateCartItemById);
router.get('/getCartItemById/:id', cartItemController.getCartItemById);
// router.get('/getCartByUserId/:id', cartController.CartByUserId);

router.delete('/deleteCartItemById/:id', cartItemController.deleteCartItemById);


module.exports = router;
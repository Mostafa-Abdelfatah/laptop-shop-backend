const CartItem = require('../models/CartItem');
const mongoose = require('mongoose');

// Add a new cart
const addCartItem = async (req, res) => {
    try {
        const { cart_id, laptop_id, quantity } = req.body;
        if (!cart_id || !laptop_id || !quantity) {
            return res.status(400).json({ message: 'cart_id, laptop_id, and quantity are required' });
        }
        const newCartItem = new CartItem({
            cart_id,
            laptop_id,
            quantity,
        });


        await newCartItem.save();
        res.status(201).json({ message: 'Cart item added successfully', cartItem: newCartItem });
    } catch (error) {
        console.error('Error adding cart item:', error);
        res.status(500).json({ message: 'Error adding cart item', error: error.message });
    }
};

const AllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No cart items found' });
        }
        res.status(200).json({ message: 'Cart items retrieved successfully', cartItems });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
};

const updateCartItemById = async (req, res) => {
    try {
        const { id } = req.params; 
        const { cart_id, laptop_id, quantity } = req.body; 
        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found', id });
        }
        if (cart_id) cartItem.cart_id = new mongoose.Types.ObjectId(cart_id);
        if (laptop_id) cartItem.laptop_id = new mongoose.Types.ObjectId(laptop_id);
        if (quantity) cartItem.quantity = quantity;
        const updatedCartItem = await cartItem.save();
        res.status(200).json({ message: 'Cart item updated successfully', cartItem: updatedCartItem });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

const deleteCartItemById = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedCartItem = await CartItem.findByIdAndDelete(id);
        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item deleted successfully', cartItem: deletedCartItem });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Error deleting cart item', error: error.message });
    }
};

const getCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Cart item retrieved successfully', cartItem });
    } catch (error) {
        console.error('Error retrieving cart item:', error);
        res.status(500).json({ message: 'Error retrieving cart item', error: error.message });
    }
};





module.exports = {
     addCartItem,
    AllCartItems,
    updateCartItemById,
    deleteCartItemById,
    getCartItemById,  
};

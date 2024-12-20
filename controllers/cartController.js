const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// Add a new cart
const addCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({ message: 'user_id is required' });
        }
        const newCart = new Cart({ user_id });
        await newCart.save();
        res.status(201).json({ message: 'Cart added successfully', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding cart', error: error.message });
    }
};

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find(); 
        res.status(200).json({ message: 'Carts retrieved successfully', carts });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving carts', error: error.message });
    }
};

const CartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart retrieved successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};

const CartByUserId = async (req, res) => {
    try {
        // const { user_id } = req.params; 
        //console.log(req.params)
        //   const cart = await Cart.find(req.params.id);
        const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(req.params.id) });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the given user_id', id });
        }
        res.status(200).json({ message: 'Cart retrieved successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const { id } = req.params; 
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the given id', id });
        }

        res.status(200).json({ message: 'Cart deleted successfully', id });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: 'Error deleting cart', error: error.message });
    }
};



module.exports = {
    addCart,
    getAllCarts,
    CartById,
    CartByUserId,
    deleteCartById,  
};

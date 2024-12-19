const Cart = require('../models/Cart');

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






module.exports = {
    addCart,
};

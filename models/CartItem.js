const mongoose = require('mongoose');
const cartitemSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    laptop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true,
    },
    quantity: {
        type: Number,
        required: true 
      },
},
{
    timestamps: true,
});

module.exports = mongoose.model('CartItem', cartitemSchema);

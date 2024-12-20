const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique:true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);

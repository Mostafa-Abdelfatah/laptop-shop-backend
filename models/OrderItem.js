const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
    Date_created: {
        type: Date,
        default: Date.now,
    },
    Date_updated: {
        type: Date,
        default: Date.now,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    laptop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true,
    },
});
orderItemSchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

orderItemSchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

module.exports = mongoose.model('OrderItem', orderItemSchema);

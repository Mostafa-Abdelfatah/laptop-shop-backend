const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    paymentMethod:{
        type:String,
        required:true,
    },
    Date_created: {
        type: Date,
        default: Date.now,
    },
    Date_updated: {
        type: Date,
        default: Date.now,
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});
orderSchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

orderSchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

module.exports = mongoose.model('Order', orderSchema);

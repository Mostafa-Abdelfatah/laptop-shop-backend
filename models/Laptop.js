const mongoose = require('mongoose');
const DEFAULT_LAPTOP_PHOTO = require('../config/constants')
const laptopSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: DEFAULT_LAPTOP_PHOTO
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    Date_created: {
        type: Date,
        default: Date.now,
    },
    Date_updated: {
        type: Date,
        default: Date.now,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    rate: {
        type: Number,
        default: 0,
        min: [0, 'Rate must be at least 0'], // Minimum value is 0
        max: [5, 'Rate must be at most 5'], // Maximum value is 5
    },
    storage: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    gpu: {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    displaySize: {
        type: String,
        required: true,
    }
});
laptopSchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

laptopSchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});



module.exports = mongoose.model('Laptop', laptopSchema);
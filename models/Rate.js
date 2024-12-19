const mongoose = require('mongoose');
const RateSchema = new mongoose.Schema({
    rate:{
        type:Number,
        require:true,
        min: [1, 'Rate must be at least 1'], // Minimum value is 0
        max: [5, 'Rate must be at most 5'], // Maximum value is 5
    },
    comment:{
        type: String,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    laptop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laptop',
        required: true,
    },
    Date_created: {
        type: Date,
        default: Date.now,
    },
    Date_updated: {
        type: Date,
        default: Date.now,
    },
});

// Compound unique index to ensure each user can rate each laptop only once
RateSchema.index({ user_id: 1, laptop_id: 1 }, { unique: true });

RateSchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

RateSchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});


module.exports = mongoose.model('Rate', RateSchema);
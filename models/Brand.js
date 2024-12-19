const mongoose = require('mongoose');
const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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
brandSchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

brandSchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

module.exports = mongoose.model('Brand', brandSchema);

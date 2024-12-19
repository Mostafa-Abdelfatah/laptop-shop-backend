const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
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
categorySchema.pre('findOneAndUpdate', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

categorySchema.pre('updateOne', function (next) {
    this.set({ Date_updated: new Date() });
    next();
});

module.exports = mongoose.model('Category', categorySchema);

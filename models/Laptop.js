const mongoose = require('mongoose');
const laptopSchema = new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,

    },
    stock:{
        type:Number,
        require: true
    },
    price:{
        type:Number,
        required:true
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
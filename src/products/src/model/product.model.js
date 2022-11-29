const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, index: true, required: true, },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;

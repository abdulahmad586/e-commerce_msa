const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: { type: Date, default: Date.now },
    customer: { type: String, index: false, required: true, },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    subtotal: { type: Number, required: true },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;

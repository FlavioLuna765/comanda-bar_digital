const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    table: String,
    status: { type: String, default: 'Pendente' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
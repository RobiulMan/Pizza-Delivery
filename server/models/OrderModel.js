const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        name: { type: String, require },
        email: { type: String, require },
        userId: { type: String, require },
        orderItems: [],
        shippingAddress: { type: Object },
        orderAccount: { type: Number, require },
        isDelivered: { type: Boolean, require, default: false },
        transactionId: { type: String, require }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;

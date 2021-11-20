const stripe = require('stripe')(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/OrderModel');

const placeOrderController = async (req, res) => {
    const { token, subtotal, cartItemState, loginState } = req.body;
    console.log({ token, subtotal, cartItemState, loginState });

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const payment = await stripe.charges.create(
            {
                amount: subtotal * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        );
        if (payment) {
            const { loginUserInfo: orderUser } = loginState;
            const newOrder = new Order({
                name: orderUser.name,
                email: orderUser.email,
                userId: orderUser.id,
                orderItems: [...cartItemState.cartItems],
                orderAccount: subtotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    pincode: token.card.address_zip
                },
                transactionId: payment.source.id
            });
            const data = await newOrder.save();

            console.log(data);
            res.send('order has been placed successfully');
        } else {
            res.send('payment faild');
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

const getOrderController = async (req, res) => {
    const { loginUserInfo } = req.body;

    try {
        const order = await Order.find({ userId: loginUserInfo.id }).sort({ _id: -1 });
        res.json({
            order
        });
    } catch (err) {
        res.status(400).json({
            message: 'someting want worng'
        });
    }
};

const getAllOrderController = async (req, res) => {
    try {
        //
        const orders = await Order.find({});
        res.json(orders);
    } catch (err) {
        //
        res.status(400).json({ message: err });
    }
};

const deliverOrderController = async (req, res) => {
    const { deliverItem } = req.body;
    try {
        //
    } catch (err) {
        //
    }
};
module.exports = {
    placeOrderController,
    getOrderController,
    getAllOrderController,
    deliverOrderController
};

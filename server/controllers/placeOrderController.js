const stripe = require('stripe')(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require('uuid');

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
            res.send('order has been placed successfully');
        } else {
            res.send('payment faild');
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = placeOrderController;

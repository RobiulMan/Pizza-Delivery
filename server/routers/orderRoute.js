const router = require('express').Router();
const { placeOrderController, getOrderController } = require('../controllers/orderController');

router.post('/placeorder', placeOrderController);
router.post('/orders', getOrderController);

module.exports = router;

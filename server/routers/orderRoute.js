const router = require('express').Router();
const {
    placeOrderController,
    getOrderController,
    getAllOrderController,
    deliverOrderController
} = require('../controllers/orderController');

router.post('/placeorder', placeOrderController);
router.post('/orders', getOrderController);
router.get('/allorder', getAllOrderController);
router.post('/deliver', deliverOrderController);

module.exports = router;

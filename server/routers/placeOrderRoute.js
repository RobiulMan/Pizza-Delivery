const router = require('express').Router();
const placeOrderController = require('../controllers/placeOrderController');

router.post('/placeorder', placeOrderController);

module.exports = router;

const router = require('express').Router();
const { getAllPizzaController } = require('../controllers/pizzaController');

router.get('/pizza', getAllPizzaController);

module.exports = router;

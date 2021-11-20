const router = require('express').Router();
const {
    getAllPizzaController,
    addPizzaController,
    pizzaByIdController,
    updatePizzaController,
    deletePizzaController
} = require('../controllers/pizzaController');

router.get('/pizza', getAllPizzaController);
router.post('/addpizza', addPizzaController);
router.post('/pizzaid', pizzaByIdController);
router.post('/edit-pizza', updatePizzaController);
router.post('/deletepizza', deletePizzaController);
module.exports = router;

const router = require('express').Router();
const registerUserController = require('../controllers/registerController');

router.post('/registation', registerUserController);

module.exports = router;

const router = require('express').Router();
const registerPostController = require('../controllers/registerController');

router.post('/registation', registerPostController);

module.exports = router;

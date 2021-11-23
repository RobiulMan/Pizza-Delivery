const router = require('express').Router();
const { getAllUserController, deleteUser } = require('../controllers/getUserController');

router.get('/alluser', getAllUserController);
router.post('/deleteuser', deleteUser);
module.exports = router;

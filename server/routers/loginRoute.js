const router = require('express').Router();

const { loginPostController, profileController } = require('../controllers/loginController');
const { authProtect } = require('../middlewares/authMiddleware');

router.post('/login', loginPostController);
router.get('/profile', authProtect, profileController);

module.exports = router;

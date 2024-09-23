const router = require('express').Router();

const {
    loginUserController,
    profileController,
    logoutUserController,
    refreshAccessTokenController,
} = require('../controllers/loginController');
const { authProtect, verifyJWT } = require('../middlewares/authMiddleware');

router.post('/login', loginUserController);
router.post('/refresh-token', verifyJWT, refreshAccessTokenController);
router.get('/profile', verifyJWT, profileController);
router.post('/logout', verifyJWT, logoutUserController);

module.exports = router;

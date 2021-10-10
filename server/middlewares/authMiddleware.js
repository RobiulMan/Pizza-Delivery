require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const authProtect = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = [req.headers.authorization.split(' ')[1]];

            const decoded = jwt.verify(token[0], process.env.JWT_KEY);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        if (!token) {
            res.status(401);

            throw new Error('Not authorized, token failed');
        }
    } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
};

module.exports = {
    authProtect
};

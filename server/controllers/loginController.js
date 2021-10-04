const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');

const loginPostController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const users = {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            };
            res.status(200).json(users);
        } else {
            res.status(401);
        }
    } catch (err) {
        console.log(err);
    }
};

const profileController = (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.status(200).json({
            profile: req.user
        });
    }
};

module.exports = {
    loginPostController,
    profileController
};

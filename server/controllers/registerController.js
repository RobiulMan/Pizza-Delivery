const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

const registerPostController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User Already Exists');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashPassword });

            await newUser.save();

            res.send('User Registation Successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ massage: error });
    }
};

module.exports = registerPostController;

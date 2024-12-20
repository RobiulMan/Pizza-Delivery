const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const registerUserController = async (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new Error("All fields are required");
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            // throw new Error('User Already Exists');

            res.status(409).json({ message: "User Already Exists" });
            return;
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashPassword });

            await newUser.save();

            res.status(201).json({ message: "User Registation Successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ massage: error });
    }
};

module.exports = registerUserController;

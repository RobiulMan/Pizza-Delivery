const mongoose = require('mongoose');
const User = require('../models/UserModel');

const getAllUserController = async (req, res) => {
    //
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.body;
    const isMongooesId = mongoose.Types.ObjectId.isValid(userId);
    console.log(isMongooesId);
    try {
        if (isMongooesId) {
            await User.findOneAndDelete({ _id: userId });
            res.send('user deleted successfully');
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
};
module.exports = { getAllUserController, deleteUser };

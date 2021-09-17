const Pizza = require('../models/Pizza');

const getAllPizzaController = async (req, res) => {
    try {
        const data = await Pizza.find({});
        res.status(200).json(data);
    } catch (error) {
        res.sataus(304).json(error);
        console.log(error);
    }
};
module.exports = {
    getAllPizzaController
};

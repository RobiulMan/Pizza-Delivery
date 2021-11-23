// const redis = require('redis');
const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');

// const client = redis.createClient({
//     host: '127.0.0.1',
//     port: '6379'
// });
// const GET_ASYNC = promisify(client.get).bind(client);
// const SET_ASYNC = promisify(client.set).bind(client);
const getAllPizzaController = async (req, res) => {
    try {
        /**
         * redis code implemention
         */
        // client.get('pizza', async (error, datas) => {
        //     if (error) {
        //         console.log(error);
        //     }
        //     if (datas !== null) {
        //         console.log('data form rides..', datas);
        //         res.status(200).json(JSON.parse(datas));
        //     } else {
        //         const resData = await Pizza.find({});
        //         // console.log(resData);
        //         const data = await client.setex('pizza', 3600, JSON.stringify(resData));
        //         console.log('first time..');
        //         res.status(200).json(data);
        //     }
        // });

        /**
         * without redis
         */
        // console.log(req.url);

        const data = await Pizza.find({});
        res.status(200).json(data);
    } catch (error) {
        res.sataus(304).json(error);
        console.log(error);
    }
};
const addPizzaController = async (req, res) => {
    const pizza = req.body;

    try {
        const addpizza = new Pizza({
            name: pizza.name,
            image: pizza.image,
            varients: Object.keys(pizza.prices),
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        });
        await addpizza.save();

        res.send('new Pizza added successfuly');
        //
    } catch (err) {
        //
        res.status(400).json({ message: err });
    }
};

const pizzaByIdController = async (req, res) => {
    const { pizzaId } = req.body;
    const isMongooesId = mongoose.Types.ObjectId.isValid(pizzaId);

    try {
        console.log(pizzaId);
        if (isMongooesId) {
            const pizza = await Pizza.findOne({ _id: pizzaId });
            // console.log(pizza);
            res.json(pizza);
        }

        // res.send('data success');
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
};

const updatePizzaController = async (req, res) => {
    const updatePizza = req.body;
    const isMongooesId = mongoose.Types.ObjectId.isValid(updatePizza.id);

    try {
        if (isMongooesId) {
            await Pizza.findOneAndUpdate(
                { _id: updatePizza.id },
                {
                    $set: {
                        name: updatePizza.name,
                        description: updatePizza.description,
                        image: updatePizza.image,
                        category: updatePizza.category,
                        prices: [updatePizza.prices]
                    }
                },
                { new: true }
            );

            res.send('pizza detiles updated successfully');
        }
    } catch (err) {
        res.json({ message: err });
    }
};
const deletePizzaController = async (req, res) => {
    const { pizzaid } = req.body;

    const isMongooesId = mongoose.Types.ObjectId.isValid(pizzaid);

    try {
        if (isMongooesId) {
            await Pizza.findOneAndDelete({ _id: pizzaid });
            res.send('pizza deleted succesfully');
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};
module.exports = {
    getAllPizzaController,
    addPizzaController,
    pizzaByIdController,
    updatePizzaController,
    deletePizzaController
};

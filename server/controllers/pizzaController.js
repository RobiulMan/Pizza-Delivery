// const redis = require('redis');
const mongoose = require("mongoose");
const Pizza = require("../models/Pizza");

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

        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const category = req.query.category || ""; // Category filter

        const query = category && category !== "all" ? { category } : {};
        const data = await Pizza.find(query);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = data.slice(startIndex, endIndex);
        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            totalItems: data.length,
            totalPages: Math.ceil(data.length / limit),
            data: results,
        });
    } catch (error) {
        res.status(304).json(error);
        console.log(error);
    }
};

const getPizzaByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const pizza = await Pizza.findById(id);
        if (!pizza) return res.status(404).json({ message: "Pizza not found" });
        res.status(200).json(pizza);
    } catch (error) {
        res.status(400).json({ message: error });
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
            prices: [pizza.prices],
        });
        await addpizza.save();

        res.status(201).send("new Pizza added successfuly");
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
                        prices: [updatePizza.prices],
                    },
                },
                { new: true },
            );

            res.send("pizza detiles updated successfully");
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
            res.send("pizza deleted succesfully");
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
};
module.exports = {
    getAllPizzaController,
    getPizzaByIdController,
    addPizzaController,
    pizzaByIdController,
    updatePizzaController,
    deletePizzaController,
};

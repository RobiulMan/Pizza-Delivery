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

        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const category = req.query.category || ""; // Category filter
        const searchterm = req.query.searchTerm || ""; // Search term for product name

        const query = {};

        if (category && category !== "all") {
            query.category = category;
        }

        if (searchterm) {
            query.name = { $regex: searchterm, $options: "i" }; // Case-insensitive search
        }

        const totalItems = await Pizza.countDocuments(query);

        const data = await Pizza.find(query)
            .skip((page - 1) * limit) // Skip items for previous pages
            .limit(limit); // Limit to items per page

        // Return the results
        res.status(200).json({
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            data,
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

// const page = parseInt(req.query.page) || 1; // Default to page 1
// const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
// const category = req.query.category || ""; // Category filter
// const searchTerm = req.query.query || ""; // Search term
//
// // Build the query object
// const query = {};
//
// // If category filter is provided and not set to "all", add it to the query
// if (category && category !== "all") {
//     query.category = category;
// }
//
// // If search term is provided, add a case-insensitive name filter
// if (searchTerm) {
//     query.name = { $regex: searchTerm, $options: "i" };
// }
//
// // Find the products based on query and apply pagination with limit and skip
// const totalItems = await Pizza.countDocuments(query); // Count total items that match the query
// const data = await Pizza.find(query)
//     .skip((page - 1) * limit) // Skip the previous pages' items
//     .limit(limit); // Limit to items per page
//
// res.status(200).json({
//     page,
//     limit,
//     totalItems,
//     totalPages: Math.ceil(totalItems / limit),
//     data,
// });

const mongoose = require('mongoose');

const PizzaSchema = mongoose.Schema(
    {
        name: { type: String, require },
        varients: [],
        prices: [],
        category: { type: String, require },
        imae: { type: String, require },
        description: { type: String, require }
    },
    {
        timestamps: true
    }
);

const Pizza = mongoose.model('Pizza', PizzaSchema);

module.exports = Pizza;

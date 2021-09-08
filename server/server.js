const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const Pizza = require('./models/Pizza');

const app = express();

const dbConnection = require('./DB/dbConnection');

dbConnection();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/api/getpizza', async (req, res) => {
    try {
        const data = await Pizza.find({});
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
});
app.get('/', (req, res) => res.status(200).send({ hello: 'word' }));

app.listen(PORT, () => console.log('Example app listening on port 3000!'));

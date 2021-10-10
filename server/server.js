require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const setRoutes = require('./routers/routes');
const dbConnection = require('./DB/dbConnection');

dbConnection();
const PORT = 8000 || process.env.PORT;
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// all routers here from the router dir
setRoutes(app);

app.get('/', (req, res) => res.status(200).send({ hello: 'word' }));

// app.use((req, res, next) => {
//     const error = new Error('404 Page Not Found');
//     error.status = 404;
//     next(error);
// });

app.use((error, req, res, next) => {
    // if (error.status === 404) {
    //     res.status(404).send(error.message);
    // } else if() {
    //     res.status(500).send(error.message);
    // }
    switch (error.status) {
        case 404:
            res.status(404).send(error.message);
            break;
        case 500:
            res.status(500).send(error.message);
            break;
        case 401:
            res.status(401).send(error.message);
            break;
        default:
            res.status(error.status);
    }
    next();
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const setRoutes = require('./routers/routes');
const dbConnection = require('./DB/dbConnection');

dbConnection();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// all routers here from the router dir
setRoutes(app);
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));
    app.get('*', function (req, res) {
        const index = path.join(__dirname, './client/build/', 'index.html');
        res.sendFile(index);
    });
}
app.get('/', (req, res) => res.status(200).send(`Server working${PORT}`));

app.use((req, res, next) => {
    const error = new Error('404 Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).send(error.message);
    } else if (error.status === 500) {
        res.status(500).send(error.message);
    }

    next();
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

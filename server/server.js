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
app.use((req, res, next) => {
    const error = new Error('404 Page Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404).json({
            error: 'error/404'
        });
    } else {
        res.status(500).json({
            error: 'error/500'
        });
    }
    next();
});

app.listen(PORT, () => console.log('Example app listening on port 8000!'));

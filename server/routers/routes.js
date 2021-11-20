const pizzaRoute = require('./pizzaRoute');
const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const placeOrderRoute = require('./orderRoute');

const routes = [
    {
        path: '/api',
        handler: pizzaRoute
    },
    { path: '/api/user', handler: registerRoute },
    {
        path: '/api/user',
        handler: loginRoute
    },
    {
        path: '/api/order',
        handler: placeOrderRoute
    }
];

const setRoutes = (app) => {
    routes.forEach((route) => {
        app.use(route.path, route.handler);
        // if (route.path === '/') {
        //     app.get(route.path, route.handler);
        // } else {

        // }
    });
};

module.exports = setRoutes;

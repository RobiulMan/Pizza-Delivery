const pizzaRoute = require('./pizzaRoute');
const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const placeOrderRoute = require('./placeOrderRoute');

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
        if (route.path === '/') {
            app.get(route.path, route.handler);
        } else {
            app.use(route.path, route.handler);
        }
    });
};

module.exports = setRoutes;

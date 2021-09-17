const pizzaRoute = require('./pizzaRoute');

const routes = [
    {
        path: '/api',
        handler: pizzaRoute
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

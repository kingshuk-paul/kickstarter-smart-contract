const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.ENVIRONMENT != 'Production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log('Running on port 3000');
    });
});
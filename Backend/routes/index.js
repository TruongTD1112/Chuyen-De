// dinh tuyen cac route 
const bookRouter = require('./Book');
const route = (app) => {
    app.use('/', bookRouter);
}

module.exports = route;
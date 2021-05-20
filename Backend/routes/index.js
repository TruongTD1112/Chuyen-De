// dinh tuyen cac route 
const bookRouter = require('./Book');
const book_elementRouter = require('./Book_element');
const route = (app) => {
    app.use('/', bookRouter);
    app.use('/', book_elementRouter);
}

module.exports = route;
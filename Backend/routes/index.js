// dinh tuyen cac route 
const bookRouter = require('./Book');
const book_elementRouter = require('./Book_element');
const userRouter = require('./User');
const adminRouter = require('./Admin');
const route = (app) => {
    app.use('/', bookRouter);
    app.use('/', book_elementRouter);
    app.use('/apiUser', userRouter);
    app.use('/apiAdmin', adminRouter);
}

module.exports = route;
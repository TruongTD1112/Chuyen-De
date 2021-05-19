// dinh tuyen cac route 
const bookRouter = require('./Book');
const userRouter = require('./User');
const route = (app) => {
    app.use('/', bookRouter);
    app.use('/apiUser', userRouter);
}

module.exports = route;
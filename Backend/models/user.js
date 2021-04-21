
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    id: {
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    birthday:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    }
})
module.exports = user = mongoose.model('user', User);
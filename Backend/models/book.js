const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = Schema({
    title:{
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})
module.exports = book = mongoose.model('book, bookSchema');

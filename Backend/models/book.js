const mongoose = require('mongoose');
const book_element = require('./book_element');
const Schema = mongoose.Schema;

const bookSchema = Schema({
    title: {
        type: String,
        required: true
    },
    // id: {
    //     type: String,
    //     required: true
    // },
    genre: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    listBook: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book_element"
        }
    ] 
})
module.exports = book = mongoose.model('book', bookSchema);


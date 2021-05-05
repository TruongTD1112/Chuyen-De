const mongoose = require('mongoose');
const user = require('./user');
const book_elementSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
        enum : ['rent', 'free'],
        required : true
    }, 
    code: {
        type: String,
        required: true
    }

})
module.exports = book_element = mongoose.model('book_element', book_elementSchema);

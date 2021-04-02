const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = Schema({
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
    }
})
module.exports = admin = mongoose.model('admin, adminSchema');
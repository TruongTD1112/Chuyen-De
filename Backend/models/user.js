
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
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
    },
    status:{
        type: String,
        enum: ['active', 'inactive', 'locked'],
        required: true
    ,
	favoriteBooks:{
		type: [String],
		required: false
	},
	resiterBooks:{
		type: [String],
		required: false
	},
	borrowBooks:{
		type: [
		{
		bookId: String,
		expireTime: Date
		}
		],
		required: false
	}
})
module.exports = user = mongoose.model('user', User);
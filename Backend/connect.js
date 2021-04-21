require('dotenv').config();
//const models = require('./models/user.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiBook = require('./routes/Book');
const route = require('./routes/index');
const cors = require('cors');
const DATABASE_URL="mongodb+srv://chuyende20202:chuyende20202@cluster0.jilvy.mongodb.net/Database?retryWrites=true&w=majority"
const PORT=4000
//const book = require('./models/book');
mongoose.connect(DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Use middleware to parse body req to json
app.use(express.json());

//Use middleware to enable cors
app.use(cors());

//Route middleware
route(app);
//app.use('/', apiBook)
//Start an express server
app.listen(PORT, () => console.log('Server Started'));

// var truyen = new book({title : "toan hoc", id : "1"});
// truyen.save((err) => console.log(err));

// get all books

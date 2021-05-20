const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const router = require('express').Router();
const book = require('../models/book');
const book_element = require('../models/book_element');
const user = require('../models/user');


router.post('/getInfoBook', async (req, res) => {
    try{
        const {bookID} = req.body;
        let InforBookElement = await book_element.findOne({_id: bookID});
        if(InforBookElement == null) return null;
        else {
            let InforBook = await book.findById(InforBookElement.rootBook);
            if(InforBookElement.status == "pending") res.json("sách đang có người đặt");
            else if (InforBookElement.status == "rent") res.json("sách có người đang thuê");
            else {
                let data = {
                    "title" : InforBook.title,
                    "genre" : InforBook.genre,
                    "author" : InforBook.author,
                    "status" : InforBookElement.status
                }
                res.json(data);
            }
        }
    }
    catch(err) {
        res.status(400).json(null);
    }
})

router.post('/rentBook', async(req, res) => {
    try{
        let {email, listIDBook} = req.body;
        let user1 = await user.findOne({email: email});
        let userId = user1._id;
        for(let i = 0; i< listIDBook.length; i++){
            await book_element.findOneAndUpdate({ _id: listIDBook[i], status: 'free' }, { status: 'rent', user: userId });
            let book = await book_element.findById(listIDBook[i]);
            await user.findByIdAndUpdate(userId, { $addToSet: { 'borrowBooks': { code: book.code, bookElementId: listIDBook[i] } } });
        }
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

router.post('/handleBookRequest', async (req, res) => {
    try{
        let {bookElementId, userId, code} = req.body; 

        await book_element.findOneAndUpdate({ _id: bookElementId, status: 'pending' }, { status: 'rent', user: userId });
        var userAfterUpdate = await user.findByIdAndUpdate(userId, { $addToSet: { 'borrowBooks': { code: code, bookElementId: bookElementId } }}, {new : true});
        console.log(userAfterUpdate);
        res.status(200).json(userAfterUpdate);
    }  
    catch(err){
      res.status(400).json({message: err.message});  
    }
})

module.exports = router;
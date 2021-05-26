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
        if(InforBookElement === null) res.json({"status" : "null"})
        else{
            let inforBook = await book.findById(InforBookElement.rootBook);
            let data = {
                "genre" : inforBook.genre,
                "title" : inforBook.title,
                "author": inforBook.author,
                "status": InforBookElement.status
            }
            res.json(data);
        }
    }
    catch(err) {
        res.json({"status": "null"});
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

router.get('/getBookRent', async(req, res) =>{
    try{
        const listBook = await book_element.find({status: "rent"}).populate('user');
        res.status(200).json(listBook);
    }
    catch(err){
        res.json({message: err.message});
    }
})

router.post('/retreiveBook', async(req, res) => {
    try{
        const {bookId, userId} = req.body;
        await book_element.findByIdAndUpdate(bookId, {status: "free", user: null});
        await user.findByIdAndUpdate(userId, {$pull: {borrowBooks: {bookElementId : bookId}}})
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.get('/getDataRegister', async(req, res) =>{
    try{
        const listBook = await book_element.find({status: "pending", user : {$ne : null, $exists: true}}).populate('user');
        res.json(listBook);
    }
    catch(err){
        res.status(200).json({message : err.message});
    }
})

router.post('/getInforById', async (req, res) =>{
    let {id} = req.body;
    try{
        let result = await book_element.findById(id);
        res.json(result);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
})

router.get('/remove', async (req, res) => {
    try{
        await book.remove({})
        await book_element.remove({})
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})
module.exports = router;
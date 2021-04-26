const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const router = require('express').Router();
const book = require('../models/book');
const book_element = require('../models/book_element');

// api lay toan bo danh sach sach co trong thu vien
router.get('/getListAllBooks', async (req,res) => {
    try{
        const listAllBooks = await book.find().sort({createdAt : -1});
        res.json(listAllBooks);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

//
router.get('/getListAllBooksElement', async (req,res) => {
    try{
        const listAllBooks = await book_element.find().sort({createdAt : -1});
        res.json(listAllBooks);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

// api nhap sach vao trong kho
router.post('/importBook', async (req,res) =>{
    try{
        console.log(req);
        let amount = req.body.amount
        let list_book = []
        for(let i = 1; i<= amount; i++){
            let bookElement = await new book({
                status: "free"
            })
            await bookElement.save(err => {console.log(err)});      
            console.log(bookElement);
            list_book.push(bookElement);
        }
        console.log(list_book);
        // console.log(req.body.title);
        // console.log(req.body.id);
        let newBook =  new book({
            title : req.body.title,
            id : req.body.id,
            author: req.body.author,
            genre: req.body.genre,
            list_book: list_book,
            amount: req.body.amount
        })
        newBook.save(err => {console.log(err)});
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
})

//Save one
// router.post("/importMaterial", async (req, res) => {
//     try {
//       let totalPrice = 0;
//       for (let i = 0; i < req.body.import.length; i++) {
//         let material = await Material.findById(req.body.import[i].material);
//         totalPrice +=
//           Number(material.priceperunit) * Number(req.body.import[i].amount);
//         material.amount += req.body.import[i].amount;
//         let newImport = { amount: req.body.import[i].amount, time: new Date() };
//         if (!material.import) material.import = [];
//         material.import.push(newImport);
//         try {
//           await material.save();
//         } catch (error) {
//           res.status(400).json({ message: err.message });
//         }
//       }
//       const importMaterial = new ImportMaterial({
//         name: req.body.name,
//         import: req.body.import,
//         totalPrice: totalPrice,
//       });
  
//       const newImportMaterial = await importMaterial.save();
  
//       const material = res.status(201).json(newImportMaterial);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
module.exports = router;
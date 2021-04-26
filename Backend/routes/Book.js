const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const router = require('express').Router();
const book = require('../models/book');

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

// api nhap sach vao trong kho
router.post('/importBook', async (req,res) =>{
    try{
        console.log(req.body.title);
        console.log(req.body.id);
        const newBook = new book({
            title : req.body.title,
            id : req.body.id
        })
        newBook.save(err => {console.log(err)});
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }

})

// api lấy sách trong thư viện có id được chỉ định
router.get('/getBookInfor/:bookId', async (req, res) => {
    try {
        var found = book.findOne({'id' : req.params.bookId});
        found.exec(function(err, bookResult) {
            if (err) return console.log(err);
            if (bookResult === null) {
                res.status(400).json({message : `No book have the id = ${req.params.bookId}`});
            } else {
                res.json(bookResult);
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// api thêm sách vào mục yêu thích
router.post('/addFavoriteBook/:bookId/:userId',async(req,res) => {
    try{
    	var update = user.updateOne({'id':req.params.userId},$push:{'favoriteBooks':req.params.bookId});
	update.exec(function(err){
		if(err) return console.log(err);
		console.log('Book is added on your favorite');
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message})
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
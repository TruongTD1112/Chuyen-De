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
        let amount = req.body.amount;
        let list_book = [];
        for(let i = 1; i<= amount; i++){
            let bookElement =  new book_element({
                status: "free",
                code: req.body.code
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
            listBook: list_book,
            amount: req.body.amount,
            code : req.body.code
        })
        await newBook.save(err => {console.log(err)});
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
    return res.json("đã nhập kho sách thành công!")
})

<<<<<<< HEAD
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
router.post('/addFavoriteBook',async(req,res) => {
    try{
    	var update = user.updateOne({'id':req.params.userId},{$push:{'favoriteBooks':req.params.bookId}});
		update.exec(function(err){
			if(err) return console.log(err);
			console.log('Book is added on your favorite');
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// api lấy danh sách sách đã yêu thích
router.get('/getFavoriteBooks/:userId/:page',async(req,res) => {
	try{
		var userId = req.params.userId;
		var page = req.params.page;
		var favBooks = user.findOne({'id':userId},{_id:0, favoriteBooks:1});
		favBooks.exec(function(err, favoriteBooksResult){
			if(err) return console.log(err);
			if(favoriteBooksResult==null){
				res.status(400).json({message : `No user have the id = ${req.params.userId}`});
            } else {
				var numOfBook = favoriteBooksResult.favoriteBooks.length;
				if((page-1)*5 > numOfBook - 1){
					console.log('page too big');
				}
				else{
					var indexLastBook = page*5;
					if(indexLastBook > numOfBook) indexLastBook = numOfBook;
					var indexFirstBook = (page-1)*5;
					var finalResult = 
					{
						favoriteBooks: favoriteBooksResult.favoriteBooks.slice(indexFirstBook,indexLastBook)
					};
					res.json(finalResult);
				}
			}
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// api đăng kí mượn sách
router.post('/registerToBorrowBook', async(req,res) => {
	try{
		var userId = req.params.userId;
		var bookId = req.params.bookId;
    	var update = user.updateOne({'id':userId},{$push:{'resiterBooks':bookId}});
		update.exec(function(err){
			if(err) return console.log(err);
			console.log('Book is resgitered');
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// api gia hạn sách
router.post('/extendBook', async(req, res) => {
	try{
		var userId = req.params.userId;
		var bookId = req.params.bookId;
		var newExpireTime = req.params.newExpireTime;
    	var update = user.updateOne({'id':userId},{$set:{'borrowBooks':req.params.bookId}});
		update.exec(function(err){
			if(err) return console.log(err);
			console.log('Book is resgitered');
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

=======

//api xuat sach tu trong kho ra
router.post('/exportBook', async (req,res) => {
    try{
        var {code, listBookExport} = req.body;
        if(listBookExport.length == 0) res.json("không có sách nào để xuất kho!");
        else {
            list = await book_element.find({"code" : code, "status": "free"});
            for(let i = 0; i< listBookExport.length; i++){
                book_element.findByIdAndRemove(listBookExport[i].id, function(err){
                    console.log(err);
                });
            }
        }
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
    res.json("xuat sach ra thanh cong!");
})
>>>>>>> master
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
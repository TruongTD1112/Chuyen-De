const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const router = require('express').Router();
const book = require('../models/book');
const book_element = require('../models/book_element');
const user = require('../models/user');
const BOOK_PER_PAGE = 5;
// api lay toan bo danh sach sach co trong thu vien
router.get('/getListAllBooks', async (req, res) => {
    try {
        const listAllBooks = await book.find().sort({ createdAt: -1 });
        res.json(listAllBooks);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.get('/getListAllBooks/:id', async(req,res) => {
    try{
        var found = book.findOne({'_id' : req.params.id});
        found.exec(function(err,result) {
            if(err) return console.log(err);
            if(result === null){
                res.status(400).json({message: 'No book_element found'});
            }else{
                res.json(result);
            }
        })
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

//
router.get('/getListAllBooksElement', async (req, res) => {
    try {
        const listAllBooks = await book_element.find().sort({ createdAt: -1 });
        res.json(listAllBooks);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.get('/getListAllBooksElement/:id', async (req,res) => {
    try{
        var found = book_element.findOne({'_id' : req.params.id});
        found.exec(function(err,result) {
            if(err) return console.log(err);
            if(result === null){
                res.status(400).json({message: 'No book_element found'});
            }else{
                res.json(result);
            }
        })
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

// api nhap sach vao trong kho
router.post('/importBook', async (req,res) =>{
    try{
        let newBook =  new book({
            title : req.body.title,
            id : req.body.id,
            author: req.body.author,
            genre: req.body.genre,
            // listBook: list_book,
            amount: req.body.amount,
            code : req.body.code
        })
        await newBook.save(err => {console.log(err)});
        let amount = req.body.amount;
        let list_book = [];
        console.log(newBook._id);
        for(let i = 1; i<= amount; i++){
            let bookElement =  new book_element({
                status: "free",
                code: req.body.code,
                user: null,
                rootBook: newBook._id
            })
            await bookElement.save(err => {console.log(err)});      
            console.log(bookElement);
            list_book.push(bookElement);
        }
        console.log(list_book);
        await book.findByIdAndUpdate(newBook._id, {listBook: list_book});
        // console.log(req.body.title);
        // console.log(req.body.id);
        res.json(list_book);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
    return res.json("???? nh???p kho s??ch th??nh c??ng!")
})


//api xuat sach tu trong kho ra
router.post('/exportBook', async (req,res) => {
    try{
        var {code, bookId} = req.body;
        var book_e = await book_element.findById(bookId);
        var bookFather = await book.findById(book_e.rootBook);
        await book.findByIdAndUpdate(book_e.rootBook, {amount:(bookFather.amount-1)});
        await book.findByIdAndUpdate(book_e.rootBook, {$pull: {
            listBook: bookId
        }});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

    res.json("xuat sach ra thanh cong!");
})


// api l???y th??ng tin s??ch trong th?? vi???n c?? id ???????c ch??? ?????nh
router.get('/getBookInfor', async (req, res) => {
    try {
        let { code } = req.query;
        book_element.findOne({ code: code }, { 'listBook': 0, 'amount': 0 })
            .then(result => {
                if (result == null) return res.status(200).send('notfound')
                else return res.status(200).send(result)
            })
            .catch(err => {
                return res.status(400).json({ message: err })
            })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// api th??m s??ch v??o m???c y??u th??ch
router.post('/addFavoriteBook', async (req, res) => {
    try {

        var update = user.findByIdAndUpdate(req.body.userId, { $addToSet: { 'favoriteBooks': req.body.bookId.trim() } });
        update.exec(function (err) {
            if (err) return res.status(400).json({ message: "C?? l???i khi th???c thi" })
            return res.status(200).json({ message: "???? th??m s??ch v??o m???c y??u th??ch" })
        })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

// api l???y danh s??ch s??ch ???? y??u th??ch
router.get('/getFavoriteBooks', async (req, res) => {
    try {
        let pageRe = /\D/;
        let userId = req.query.userId;
        let page = req.query.page;

        if (page == undefined || pageRe.test(page) || parseInt(page) <= 0) {
            page = 1;
        }
        page = parseInt(page)
        var favBooks = user.findById(userId, { _id: 0, favoriteBooks: 1 });

        favBooks.exec(function (err, favoriteBooksResult) {
            if (err) return res.status(400).json({ message: err });

            if (favoriteBooksResult == null) {
                res.status(400).json({ message: `No user have the id = ${userId}` });
            } else {

                var numOfBook = favoriteBooksResult.favoriteBooks.length;
                if ((page - 1) * 5 > numOfBook - 1) {
                    return res.status(200).json({ message: "Kh??ng c?? s??ch" });
                }
                else {
                    var indexLastBook = page * 5;
                    if (indexLastBook > numOfBook) indexLastBook = numOfBook;
                    var indexFirstBook = (page - 1) * 5;

                    let favoriteBooks = favoriteBooksResult.favoriteBooks.slice(indexFirstBook, indexLastBook);
                    let getFavoriteBookInfoPromise = favoriteBooks.map((id, index) => {
                        return book.findById(id, { listBook: 0 })
                    })
                    Promise.all(getFavoriteBookInfoPromise)
                        .then(result => {

                            res.status(200).json(result);
                        })
                        .catch(err => {
                            res.status(400).json({ message: err.message })
                        })

                }
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// // api ????ng k?? m?????n s??ch
// router.post('/registerToBorrowBook', async (req, res) => {
//     try {
//         let userId = req.body.userId;
//         let code = req.body.code;

//         let freeBook = await book_element.findOneAndUpdate({ code: code, status: 'free' }, { status: 'pending' }, { new: true })
//         if (freeBook !== null) {

//             await user.findByIdAndUpdate(userId, { $addToSet: { 'registerBooks': { code: code, bookElementId: freeBook._id } } }, { new: true })
//             return res.status(200).json({ registerBook: { code: code, bookElementId: freeBook._id } });
//         } else {
//             return res.status(200).json({ message: "H???t s??ch" })
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })

// // h???y ????ng k?? m?????n s??ch
// router.post('/unregisterToBorrowBook', async (req, res) => {
//     let { userId, code, bookElementId } = req.body;

//     try {
//         let userfound = await user.findByIdAndUpdate(userId, { $pull: { 'registerBooks': {code: code, bookElementId: bookElementId } } }, { new: true })

//         let pendingBook = await book_element.findByIdAndUpdate(bookElementId, { status: 'free' }, { new: true })
//         return res.status(200).json(userfound)
//     } catch (error) {

//         res.status(400).json({ message: error.message })
//     }
// })

// api ????ng k?? m?????n s??ch
router.post('/registerToBorrowBook', async (req, res) => {
    try {
        let userId = req.body.userId;
        let code = req.body.code;

        let freeBook = await book_element.findOneAndUpdate({ code: code, status: 'free'}, { status: "pending", user: userId}, { new: true })
        if (freeBook !== null) {

            await user.findByIdAndUpdate(userId, { $addToSet: { 'registerBooks': { code: code, bookElementId: freeBook._id } } }, { new: true })
            return res.status(200).json({ registerBook: { code: code, bookElementId: freeBook._id } });
        } else {
            return res.status(200).json({ message: "H???t s??ch" })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// h???y ????ng k?? m?????n s??ch
router.post('/unregisterToBorrowBook', async (req, res) => {
    let { userId, code, bookElementId } = req.body;

    try {
        let book = await book_element.findOne({_id: bookElementId});
        if(book.status != "pending") res.json("s??ch ??ang kh??ng ??? tr???ng th??i pending");
        else{
            let userfound = await user.findByIdAndUpdate(userId, { $pull: { 'registerBooks': {code: code, bookElementId: bookElementId } } }, { new: true })

            let pendingBook = await book_element.findByIdAndUpdate(bookElementId, { status: 'free' }, { new: true })
            return res.status(200).json(userfound)
        }
    } catch (error) {

        res.status(400).json({ message: error.message })
    }
})

// xu ly request muon sach
router.post('/handleBookRequest', async (req, res) => {
    try{
        let {bookElementId, userId, code} = req.body; 
        let currentDate = (new Date()).getTime()
        let expireTime = new Date(currentDate + 60 * 24 * 60 * 60 * 1000)
        await book_element.findOneAndUpdate({ _id: bookElementId, status: 'pending' }, { status: 'rent', user: userId });
        await user.findOneAndUpdate({_id: userId}, {$pull: {registerBooks: {bookElementId : bookElementId, code : code}}})
        await user.findByIdAndUpdate(userId, { $addToSet: { 'borrowBooks': { code: code, bookElementId: bookElementId, expireTime: expireTime } } });
        return res.status(200).json({message: "Xac nhan thanh cong"})
    }  
    catch(err){
      res.status(400).json({message: err.message});  
    }
})




// api gia h???n s??ch
router.post('/extendBook', async (req, res) => {
    try{
        let {userId,bookElementId, newExpireTime} = req.body;
        
        let update = await user.updateOne({_id: userId, "borrowBooks.bookElementId": bookElementId},{
            $set: {"borrowBooks.$.expireTime": newExpireTime}
        }, {new: true})
        return res.status(200).json({message: "OK"})
    }catch(error){
        return res.status(400).json(error)
    }
})
// l???y danh s??ch s??ch ??ang m?????n
router.get('/borrowingBooks', async (req, res) => {
    let { userId, page } = req.query;
    let pageRe = /\D/;
    if (page == undefined || pageRe.test(page) || parseInt(page) <= 0) {
        page = 1;
    }
    page = parseInt(page)

    if (page < 0) return res.status(400).json({ message: "Khong tim thay" });
    let userFound = await user.findById(userId)

    let listBorrowCode = userFound.borrowBooks.map((elem, index) => elem.code);
    let listExpireTime = userFound.borrowBooks.map((elem, index) => elem.expireTime)
    let borrowBookELementId = userFound.borrowBooks.map((elem, index) => elem.bookElementId)
    if ((page - 1) * BOOK_PER_PAGE > listBorrowCode.length) {
        return res.status(400).json({ message: "Khong tim thay" });
    }
    let listBookCodeNeed = listBorrowCode.slice((page - 1) * BOOK_PER_PAGE, Math.min(page * BOOK_PER_PAGE, listBorrowCode.length));
    let getListRootBookPromise = listBookCodeNeed.map((elem, index) => {
        return book.findOne({code: elem}, {listBook: 0});
    })
    try {
        let result = await Promise.all(getListRootBookPromise);

        return res.status(200).json({borrowBooks: result, expireTimes: listExpireTime, borrowBookELementId: borrowBookELementId});
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }


})
// t??m ki???m s??ch
router.get('/searchBook', async (req, res) => {
    let { code, title, author, genre, page } = req.query;
    let pageRe = /\D/;
    if (page == undefined || pageRe.test(page) || parseInt(page) <= 0) {
        page = 1;
    }
    page = parseInt(page)

    if (code === undefined || code === "") {
        let altTitle = ""
        let titleReg = new RegExp(altTitle.trim(), 'u');
        if (title !== undefined) titleReg = new RegExp(title.trim(), 'u');

        let altAuthor = ""
        let authorReg = new RegExp(altAuthor.trim(), 'u');
        if (author !== undefined) authorReg = new RegExp(author.trim(), 'u');

        let altGenre = ""
        let genreReg = new RegExp(altGenre.trim(), 'u');
        if (genre !== undefined) genreReg = new RegExp(genre.trim(), 'u');
        book.find({
            title: { $regex: titleReg },
            author: { $regex: authorReg },
            genre: { $regex: genreReg }
        }, { listBook: 0 })
            .skip((page - 1) * BOOK_PER_PAGE)
            .limit(BOOK_PER_PAGE)
            .then(result => {
                return res.status(200).json(result);
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }
    else {
        book.findOne({ code: code })
            .then(result => {

                return res.status(200).json([result])
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }



})
// l???y id s??ch ???? ????ng k??
router.get('/getAllRegisteredBookId', async (req, res) => {
    let userId = req.query.userId;
    try {
        let listId = await user.findById(userId)
        let registerBooksId = listId.registerBooks;
        if (registerBooksId === null) {
            return res.status(400).json({ message: null })
        }
        return res.status(200).json(registerBooksId);
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})
// l???y  th??ng tin c???a 1 list c??c quy???n s??ch
router.get('/getListBookInfor', async (req, res) => {

    try {
        let codes = req.query.codes;

        codes = JSON.parse(codes)

        let getInfoPromise = codes.map((elem, index) => {
            return book.findOne({code: elem}, { listBook: 0 })
        })
        Promise.all(getInfoPromise)
            .then(result => {
                return res.status(200).json(result)
            })
    } catch (error) {
        return res.status(400).json(error)
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

router.post('/getByListID', async (req, res) => {
    //const records = await Model.find({ '_id': { $in: ids } });
    const list_id = req.body.list_id;
    const data = await book_element.find({ '_id': { $in: list_id } });
    res.json(data);
}
);


module.exports = router;
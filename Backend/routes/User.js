const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const router = require('express').Router();
const user = require('../models/user');

// Note: password must be encrypted before insert to database.
// When login: password input after encrypted will be compare with password in database
// In the current code: password is raw (not encrypted).

/*
List API write in this file:
Method = GET
    /getListAllUsers            --> get all users from database
    /getInformation/:email      --> get all information of an user have email
Method = POST
    /login                      --> login in system as a user
    /createNewUser              --> create a new user
Method = PUT
    /updateInformation/:email   --> update information for an user have email
    /changePassword/:email      --> change password for an user have email
Method = DELETE
    /deleteById/:id             --> delete an user by id (not used)
    /deleteByEmail/:email       --> delete an user have email (set status = 'inactive')
*/

// Api get all user from database
router.get('/getListAllUsers', async (req, res) => {
    try{
        const listAllUsers = await user.find().sort({createdAt : -1});
        res.json(listAllUsers);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

// Api get all information of a user have email
/*
Example for input: GET http://localhost:4000/apiUser/getInformation/aloha.669124@sis.hust.edu.vn
*/
router.get('/getInformation/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function(err, userResult) {
            if (err) return console.log(err);
            if (userResult === null) {
                res.status(400).json({message : `No user have the email = ${req.params.email}`});
            } else {
                res.json(userResult);
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// Api for login user in system
/*
Example for input: POST http://localhost:4000/apiUser/login
{
    "email" : "thanh.la170115@sis.hust.edu.vn",
    "password" : "12345678"
}
*/
router.post('/login', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.body.email, 'status' : 'active'});
        found.exec(function(err, userResult) {
            if (err) return console.log(err);
            if ((userResult === null) || (userResult.password !== req.body.password)) {
                res.status(400).json({message : "Email or Password wrong"});
            } else {
                res.json(userResult);
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api add a new user to the database
/*
Example for input: POST http://localhost:4000/apiUser/createNewUser
{
    "email": "aloha.669124@sis.hust.edu.vn",
    "password": "12345678",
    "confirmPassword" : "12345678",
    "firstName": "Nguyen",
    "lastName": "Aloha",
    "birthday": "10-01-2001",
    "class": "CNTT-11"
}
*/
router.post('/createNewUser', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.body.email});
        found.exec(function(err, userResult) {
            if (err) return console.log(err);
            if (userResult !== null) {
                res.status(400).json({message : "Email has been used. Please use another email."});
            }
            else {
                if ((req.body.password !== req.body.confirmPassword) || (req.body.password === undefined)) {
                    res.status(400).json({message : "Password not confirmed."})
                } else if (Object.keys(req.body.password).length < 8){
                    res.status(400).json({message : "Password is too short. Please equal or more than 8 characters."});
                } else {
                    const newUser = new user({
                        email : req.body.email,
                        password : req.body.password,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        birthday : req.body.birthday,
                        class : req.body.class,
                        status : "active"
                    })
                    newUser.save(err => {
                        if (err) res.status(400).json(err);
                        else res.json(newUser);
                    });
                }
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for update information of an user have email
/*
Example for input: PUT http://localhost:4000/apiUser/updateInformation/aloha.669124@sis.hust.edu.vn
{
    "firstName": "Nguyen",
    "lastName": "Aloha",
    "birthday": "10-01-2001",
    "class": "CNTT-11"
}
*/
router.put('/updateInformation/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function (err, userResult) {
            if (err) return console.log(err);
            else {
                if (userResult === null) {
                    res.status(400).json({message : `No user have the email = ${req.params.email}`});
                } else {
                    const updateUser = req.body;
                    userResult.firstName = ((updateUser.firstName === undefined) || (updateUser.firstName === "")) ? userResult.firstName : updateUser.firstName;
                    userResult.lastName = ((updateUser.lastName !== undefined) && (updateUser.lastName !== "")) ? updateUser.lastName : userResult.lastName;
                    userResult.birthday = ((updateUser.birthday !== undefined) && (updateUser.birthday !== "")) ? updateUser.birthday : userResult.birthday;
                    userResult.class = ((updateUser.class !== undefined) && (updateUser.class !== "")) ? updateUser.class : userResult.class;
                    userResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.json(userResult);
                    })
                }
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for change password of an user have email
/*
Example for input: PUT http://localhost:4000/apiUser/changePassword/aloha.669124@sis.hust.edu.vn
{
    "oldPassword" : "12345678",
    "newPassword": "87654321",
    "confirmNewPassword" : "87654321"
}
*/
router.put('/changePassword/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function (err, userResult) {
            if (err) return console.log(err);
            else {
                console.log(userResult.password);
                console.log(req.body.oldPassword);
                if (userResult === null) {
                    res.status(400).json({message : `No user have the email = ${req.params.email}`});
                } else {
                    const updatePassword = req.body;
                    if (updatePassword.oldPassword !== userResult.password) {
                        res.status(400).json({message : "Old password wrong"});
                    } else if ((updatePassword.newPassword !== updatePassword.confirmNewPassword) || (updatePassword.newPassword === undefined) ||
                                updatePassword.confirmNewPassword === undefined) {
                        res.status(400).json({message : "Confirm new password wrong"});
                    } else if (Object.keys(updatePassword.newPassword).length < 8) {
                        res.status(400).json({message : "New password too short. Please more than or equal 8 characters."});
                    } else {
                        userResult.password = updatePassword.newPassword;
                        userResult.save(function (err, result) {
                            if (err) res.status(400).json(err);
                            else res.json(result);
                        })
                    }
            }
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})


// Export
module.exports = router;
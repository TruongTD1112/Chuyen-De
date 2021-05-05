const { CommandCursor } = require('mongodb');
const mongoose = require('mongoose');
const admin = require('../models/admin');
const router = require('express').Router();
const user = require('../models/user');

// Note: password must be encrypted before insert to database.
// When login: password input after encrypted will be compare with password in database
// In the current code: password is raw (not encrypted).

/*
List API write in this file:
Method = GET
    /getListAllUsers                    --> get all users from database
    /getListAllLockedUsers              --> get all users from database and status = locked
    /getListAllAdmins                   --> get all admins from database
    /getInformationOfUser/:email        --> get all information of an user have email
    /getInformationOfAdmin/:email       --> get all information of an admin have email
Method = POST
    /login                              --> login in system as a admin
    /createNewAdmin                     --> create a new user
Method = PUT
    /lockUserByEmail/:email             --> lock an user have email (set status = 'locked')
    /unlockUserByEmail/:email           --> unlock an user have email (set status = 'active')
    /updateInformation/:email           --> update information of an admin have email
    /changePassword/:email              --> change password of an admin have email
Method = DELETE
    /deleteUserByEmail/:email           --> delete an user have email (set status = 'inactive')
    /deleteAdminByEmail/:email          --> delete an admin have email (set status = 'inactive')
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

// Api get all user from database has status = locked
router.get('/getListAllLockedUsers', async (req, res) => {
    try{
        const listAllUsers = await user.find({'status' : 'locked'}).sort({createdAt : -1});
        res.json(listAllUsers);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

// Api get all admin from database
router.get('/getListAllAdmins', async (req, res) => {
    try {
        const listAllAdmins = await admin.find().sort({createdAt : -1});
        res.json(listAllAdmins);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api get all information of a user have email
/*
Example for input: GET http://localhost:4000/apiAdmin/getInformationOfUser/aloha.669124@sis.hust.edu.vn
*/
router.get('/getInformationOfUser/:email', async (req, res) => {
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

// Api get all information of a user have email
/*
Example for input: GET http://localhost:4000/apiAdmin/getInformationOfAdmin/aloha.669124@sis.hust.edu.vn
*/
router.get('/getInformationOfAdmin/:email', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.params.email});
        found.exec(function(err, adminResult) {
            if (err) return console.log(err);
            if (adminResult === null) {
                res.status(400).json({message : `No admin have the email = ${req.params.email}`});
            } else {
                res.json(adminResult);
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

// Api for login user in system
/*
Example for input: POST http://localhost:4000/apiAdmin/login
{
    "email" : "thanh.la170115@sis.hust.edu.vn",
    "password" : "12345678"
}
*/
router.post('/login', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.body.email, 'status' : 'active'});
        found.exec(function(err, adminResult) {
            if (err) return console.log(err);
            if ((adminResult === null) || (adminResult.password !== req.body.password)) {
                res.status(400).json({message : "Email or Password wrong"});
            } else {
                res.json(adminResult);
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api add a new admin to the database
/*
Example for input: POST http://localhost:4000/apiAdmin/createNewAdmin
{
    "email": "aloha.669124@sis.hust.edu.vn",
    "password": "12345678",
    "confirmPassword" : "12345678",
    "firstName": "Nguyen",
    "lastName": "Aloha",
    "birthday": "10-01-2001"
}
*/
router.post('/createNewAdmin', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.body.email});
        found.exec(function(err, adminResult) {
            if (err) return console.log(err);
            if (adminResult !== null) {
                res.status(400).json({message : "Email has been used. Please use another email."});
            }
            else {
                if ((req.body.password !== req.body.confirmPassword) || (req.body.password === undefined)) {
                    res.status(400).json({message : "Password not confirmed."})
                } else if (Object.keys(req.body.password).length < 8){
                    res.status(400).json({message : "Password is too short. Please equal or more than 8 characters."});
                } else {
                    const newAdmin = new admin({
                        email : req.body.email,
                        password : req.body.password,
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        birthday : req.body.birthday,
                        status : "active"
                    })
                    newAdmin.save(err => {
                        if (err) res.status(400).json(err);
                        else res.json(newAdmin);
                    });
                }
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for lock an user have email
/*
Example for input: PUT http://localhost:4000/apiAdmin/lockUserByEmail/aloha.669124@sis.hust.edu.vn
*/
router.put('/lockUserByEmail/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function (err, userResult) {
            if (err) return console.log(err);
            else {
                if (userResult === null) {
                    res.status(400).json({message : `No member have the email = ${req.params.email}`});
                } else {
                    userResult.status = "locked";
                    userResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.status(200).json({message : "Lock user successfully", userResult});
                    });
                }
            }
        })       
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for unlock an user have email
/*
Example for input: PUT http://localhost:4000/apiAdmin/unlockUserByEmail/aloha.669124@sis.hust.edu.vn
*/
router.put('/unlockUserByEmail/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function (err, userResult) {
            if (err) return console.log(err);
            else {
                if (userResult === null) {
                    res.status(400).json({message : `No member have the email = ${req.params.email}`});
                } else {
                    userResult.status = "active";
                    userResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.status(200).json({message : "Unlock user successfully", userResult});
                    });
                }
            }
        })       
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for update information of an admin have email
/*
Example for input: PUT http://localhost:4000/apiAdmin/updateInformation/aloha.669124@sis.hust.edu.vn
{
    "firstName": "Nguyen",
    "lastName": "Aloha",
    "birthday": "10-01-2001"
}
*/
router.put('/updateInformation/:email', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.params.email});
        found.exec(function (err, adminResult) {
            if (err) return console.log(err);
            else {
                if (adminResult === null) {
                    res.status(400).json({message : `No admin have the email = ${req.params.email}`});
                } else {
                    const updateadmin = req.body;
                    adminResult.firstName = ((updateadmin.firstName === undefined) || (updateadmin.firstName === "")) ? adminResult.firstName : updateadmin.firstName;
                    adminResult.lastName = ((updateadmin.lastName !== undefined) && (updateadmin.lastName !== "")) ? updateadmin.lastName : adminResult.lastName;
                    adminResult.birthday = ((updateadmin.birthday !== undefined) && (updateadmin.birthday !== "")) ? updateadmin.birthday : adminResult.birthday;
                    adminResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.json(adminResult);
                    })
                }
            }
        })
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for change password of an admin have email
/*
Example for input: PUT http://localhost:4000/apiAdmin/changePassword/aloha.669124@sis.hust.edu.vn
{
    "oldPassword" : "12345678",
    "newPassword": "87654321",
    "confirmNewPassword" : "87654321"
}
*/
router.put('/changePassword/:email', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.params.email});
        found.exec(function (err, adminResult) {
            if (err) return console.log(err);
            else {
                if (adminResult === null) {
                    res.status(400).json({message : `No admin have the email = ${req.params.email}`});
                } else {
                    const updatePassword = req.body;
                    if ((updatePassword.oldPassword !== adminResult.password)) {
                        res.status(400).json({message : "Old password wrong"});
                    } else if (((updatePassword.newPassword !== updatePassword.confirmNewPassword) || (updatePassword.newPassword === undefined) ||
                                (updatePassword.confirmNewPassword === undefined))) {
                        res.status(400).json({message : "Confirm new password wrong"});
                    } else if ((Object.keys(updatePassword.newPassword).length < 8)) {
                        res.status(400).json({message : "New password too short. Please more than or equal 8 characters."});
                    } else {
                        adminResult.password = updatePassword.newPassword;
                        adminResult.save(function (err, result) {
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

// Api for delete an user have email
/*
Example for input: DELETE http://localhost:4000/apiAdmin/deleteUserByEmail/aloha.669124@sis.hust.edu.vn
*/
router.delete('/deleteUserByEmail/:email', async (req, res) => {
    try {
        var found = user.findOne({'email' : req.params.email});
        found.exec(function (err, userResult) {
            if (err) return console.log(err);
            else {
                if (userResult === null) {
                    res.status(400).json({message : `No member have the email = ${req.params.email}`});
                } else {
                    userResult.status = "inactive";
                    userResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.status(200).json({message : "Delete user successfully", userResult});
                    });
                }
            }
        })       
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Api for delete an admin have email
/*
Example for input: DELETE http://localhost:4000/apiAdmin/deleteAdminByEmail/aloha.669124@sis.hust.edu.vn
*/
router.delete('/deleteAdminByEmail/:email', async (req, res) => {
    try {
        var found = admin.findOne({'email' : req.params.email});
        found.exec(function (err, adminResult) {
            if (err) return console.log(err);
            else {
                if (adminResult === null) {
                    res.status(400).json({message : `No member have the email = ${req.params.email}`});
                } else {
                    adminResult.status = "inactive";
                    adminResult.save(err => {
                        if (err) res.status(400).json(err);
                        else res.status(200).json({message : "Delete admin successfully", adminResult});
                    });
                }
            }
        })       
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

// Export
module.exports = router;
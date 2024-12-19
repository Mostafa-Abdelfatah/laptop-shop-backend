const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/getAllUsers',userController.getAllUsers);
router.get('/getUserById/:id',userController.getUserById)
router.get('/getUserByEmail/:email',userController.getUserByEmail)
router.post('/addUser',userController.addUser);
router.put('/updateUserById/:id',userController.updateUserById)
router.put('/updateUserByEmail/:email',userController.updateUserByEmail)
router.delete('/deleteUserById/:id',userController.deleteUserById)
router.delete('/deleteUserByEmail/:email',userController.deleteUserByEmail)

module.exports = router;
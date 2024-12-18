const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/getAllUsers',userController.getAllUsers);

router.post('/addUser',userController.addUser);

module.exports = router;
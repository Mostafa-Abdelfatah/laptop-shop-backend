const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const authValidator= require('../validators/authValidator');
const { validationResult } = require('express-validator');

const handleValidationErrors  = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.post('/register', authValidator.validateRegister, handleValidationErrors, authController.register);
router.post('/login', authValidator.validateLogin, handleValidationErrors, authController.login);
router.get('/profile', authMiddleware.authMiddleware, authController.getProfile);
router.post('/logout', authMiddleware.authMiddleware, authController.logout);

module.exports = router;
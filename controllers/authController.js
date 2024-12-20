const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const createToken = require('../utils/createToken');
const User = require('../models/User');

const register = asyncHandler(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password', 401));
  }
  const token = createToken(user._id);
  delete user._doc.password;
  res.status(200).json({ data: user, token });
});

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ApiError('You are not login, Please login to get access this route',401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError('The user that belong to this token does no longer exist', 401));
  }
  req.user = currentUser;
  next();
});

module.exports = { register, login, protect };

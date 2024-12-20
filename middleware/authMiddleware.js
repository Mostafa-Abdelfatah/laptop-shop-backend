const jwt = require('jsonwebtoken');
const User = require('../models/User');
const blacklist = require('../middleware/blackList')

const authMiddleware = async (req, res, next) => {
  try{
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.status(401).json({ message: 'Authentication required' });
    if (blacklist.has(token))
      return res.status(401).json({ message: 'Token has been revoked' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  }catch(err){
    res.status(401).json({ message: 'Invalid token' });
  }
}

const adminMiddleware = async (req, res, next) => {
  if (!req.user||!req.user.isAdmin)
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  next();
}

module.exports = { authMiddleware, adminMiddleware };
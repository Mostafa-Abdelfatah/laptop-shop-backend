const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const User = require('../models/User');
const blacklist = require('../middleware/blackList')



const register = async (req,res) => {
  try{
    const existingUser = await User.findOne({email:req.body.email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = createToken(user._id);
    res.status(201).json({ message: 'User Registered successfully', data: user, token });
  }catch(error){
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

const login = async (req,res) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({message:"Incorrect email or password"});
    }
    const token = createToken(user._id);
    user.password = undefined;
    res.status(200).json({ message: 'User logged in successfully', data: user, token });
  }catch(err){
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
}

const getProfile = async (req,res) => {
  try{
    res.status(200).json({user:req.user});
  }catch(err){
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
    }
    blacklist.add(token);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging out', error: err.message });
  }
};



module.exports = { register, login, getProfile, logout };

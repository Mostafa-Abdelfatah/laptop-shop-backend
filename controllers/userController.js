const User = require('../models/User');
const bcrypt = require('bcrypt');
const Cart = require('../models/Cart')
const cloudinary = require('../utils/cloudinary');
const {DEFAULT_USER_PHOTO,} = require('../config/constants');
const getAllUsers = async (req, res) => {
  try {
    const {Fname,Lname,email,page=1,limit=10,sort='desc'} = req.query
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) 
      return res.status(400).json({ message: 'Page and limit must be numbers.' });
    const validSort = ['asc', 'desc'];
    if (!validSort.includes(sort)) 
      return res.status(400).json({ message: 'Invalid sort value. Use "asc" or "desc".' });
    /**
     * here isnstead of retreiving all the users from the database we are retreiving only 10 users to prevent the server from crashing
     * so we send the users page by page & every page contains 10 users
     * then we search for the users by Fname or Lname or email (Optionally beside page & limit)
     * beside all of that we can sort the users descending or ascending by date created
     */
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = {};
    if(Fname) filter.Fname = {$regex: Fname, $options: 'i'} // 'i' for case insensitive
    if(Lname) filter.Lname = {$regex: Lname, $options: 'i'}
    if(email) filter.email = {$regex: email, $options: 'i'}
    const sortOrder = sort === 'asc' ? 1 : -1; // 1 for ascending & -1 for descending & default is descending
    const users = await User.find(filter) // filtering (Searh by Fname or Lname or email)
    .sort({createdAt: sortOrder})
    .skip(skip)
    .limit(limit); // Pagination 
    if (users.length === 0)
      return res.status(404).json({ message: 'No users found' });
    const totalUsers = await User.countDocuments(filter);
    res.status(200).json({
      success: true,
      totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const photo = req.file ? req.file.path : DEFAULT_USER_PHOTO;
    const user = await User.create({ ...req.body, password: hashedPassword , photo });
    const cart = await Cart.create({ user_id: user._id });
    res.status(201).json({
      message: 'User and cart created successfully',
      user,
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the associated cart
    await Cart.findOneAndDelete({ user_id: deletedUser._id });

    res.status(200).json({ message: 'User and their cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

const deleteUserByEmail = async (req, res) => {
  try {
    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the associated cart
    await Cart.findOneAndDelete({ user_id: deletedUser._id });

    res.status(200).json({ message: 'User and their cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};


const uploadUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.photo&&user.photo !== DEFAULT_USER_PHOTO) {
      const publicId = user.photo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    user.photo = req.file.path;
    await user.save();
    res.status(200).json({ message: 'User image uploaded successfully', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading user image', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
  deleteUserByEmail,
  uploadUserImage
};
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/getAllCategories', categoryController.getAllCategories); // Get all categories with pagination
router.get('/getCategoryById/:id', categoryController.getCategoryById); // Get category by ID
router.get('/getCategoryByName/:name', categoryController.getCategoryByName); // Get category by name

router.post('/addCategory', categoryController.addCategory); // Add a new category

router.delete('/deleteCategoryById/:id', categoryController.deleteCategoryById); // Delete category by ID
router.delete('/deleteCategoryByName/:name', categoryController.deleteCategoryByName); // Delete category by name

router.put('/updateCategoryById/:id', categoryController.updateCategoryById); // Update category by ID
module.exports = router;
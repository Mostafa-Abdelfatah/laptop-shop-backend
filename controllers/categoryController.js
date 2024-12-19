const Category = require("../models/Category")

const getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const categories = await Category.find().skip(skip).limit(limit);
        const totalCategories = await Category.countDocuments();

        res.status(200).json({
            totalCategories,
            totalPages: Math.ceil(totalCategories / limit),
            currentPage: page,
            categories,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
};

const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params; // Extract the partial name from the URL
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const query = { name: { $regex: name, $options: 'i' } };

        const categories = await Category.find(query).skip(skip).limit(limit);

        const totalCategories = await Category.countDocuments(query);

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found with the given name' });
        }

        res.status(200).json({
            totalCategories,
            totalPages: Math.ceil(totalCategories / limit),
            currentPage: page,
            categories,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories by name', error: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error adding category', error: error.message });
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

const deleteCategoryByName = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ name: req.params.name });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};

const updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,

    addCategory,

    deleteCategoryById,
    deleteCategoryByName,

    updateCategoryById,
};
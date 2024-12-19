const Brand = require('../models/Brand');

// Add a new brand
const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const newBrand = new Brand({ name });
        await newBrand.save();
        res.status(201).json({ message: 'Brand added successfully', brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: 'Error adding brand', error: error.message });
    }
};

// Get all brands with optional pagination
const getAllBrands = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const brands = await Brand.find().skip(skip).limit(limit);
        const totalBrands = await Brand.countDocuments();

        res.status(200).json({
            totalBrands,
            totalPages: Math.ceil(totalBrands / limit),
            currentPage: page,
            brands,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands', error: error.message });
    }
};

// Get brand by ID
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findById(id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brand by ID', error: error.message });
    }
};

// Get brands by name with partial matching and pagination
const getBrandsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const brands = await Brand.find({ name: { $regex: name, $options: 'i' } })
            .skip(skip)
            .limit(limit);

        if (brands.length === 0) {
            return res.status(404).json({ message: 'No brands found with the given name' });
        }

        const totalBrands = await Brand.countDocuments({ name: { $regex: name, $options: 'i' } });

        res.status(200).json({
            totalBrands,
            totalPages: Math.ceil(totalBrands / limit),
            currentPage: page,
            brands,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands by name', error: error.message });
    }
};

// Update brand by ID
const updateBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { name, Date_updated: new Date() },
            { new: true }
        );

        if (!updatedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
    } catch (error) {
        res.status(500).json({ message: 'Error updating brand', error: error.message });
    }
};

// Delete brand by ID
const deleteBrandById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand deleted successfully', brand: deletedBrand });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand', error: error.message });
    }
};

// Delete brands by name
const deleteBrandByName = async (req, res) => {
    try {
        const { name } = req.params;

        const deletedBrand = await Brand.findOneAndDelete({ name });

        if (!deletedBrand) {
            return res.status(404).json({ message: 'No brand found with the given name' });
        }

        res.status(200).json({
            message: `Brand with name "${name}" deleted successfully`,
            brand: deletedBrand,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand by name', error: error.message });
    }
};

module.exports = { deleteBrandByName };


module.exports = {
    addBrand,
    getAllBrands,
    getBrandById,
    getBrandsByName,
    updateBrandById,
    deleteBrandById,
    deleteBrandByName,
};

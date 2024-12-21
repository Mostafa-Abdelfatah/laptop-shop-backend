const Laptop = require('../models/Laptop');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const cloudinary = require('../utils/cloudinary');
const { DEFAULT_LAPTOP_PHOTO } = require('../config/constants');

// Get laptop by ID
const getLaptopById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }
        res.status(200).json(laptop);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptop', error: error.message });
    }
};

// Get all laptops with pagination
// const getAllLaptops = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const skip = (page - 1) * limit;
//
//         const laptops = await Laptop.find().skip(skip).limit(limit);
//         const totalLaptops = await Laptop.countDocuments();
//
//         res.status(200).json({
//             totalLaptops,
//             totalPages: Math.ceil(totalLaptops / limit),
//             currentPage: page,
//             laptops,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching laptops', error: error.message });
//     }
// };


const getAllLaptops = async (req, res) => {
    try {
        const {
            stock, // Filter by stock status (in, out, or all)
            brandName, // Filter by brand name
            categoryName, // Filter by category name
            cpu, // Filter by CPU name
            gpu, // Filter by GPU name
            ram, // Filter by RAM size
            storage, // Filter by storage type
            rate, // Filter by rate
            laptopName, // Filter by laptop name
            page = 1, // Current page number
            limit = 10, // Number of items per page
            sort, // Sort order (asc or desc)
            displaySize, // Filter by display size
        } = req.query;

        // Initialize query object
        const query = {};

        // Filter by stock status
        if (stock) {
            if (stock.toLowerCase() === 'in') {
                query.stock = { $gt: 0 }; // In-stock laptops
            } else if (stock.toLowerCase() === 'out') {
                query.stock = { $lte: 0 }; // Out-of-stock laptops
            }
        }

        // Filter by brand name
        if (brandName) {
            const brands = await Brand.find({
                name: { $regex: brandName, $options: 'i' }, // Case-insensitive partial match
            });
            const brandIds = brands.map((brand) => brand._id);
            query.brand_id = { $in: brandIds };
        }

        // Filter by category name
        if (categoryName) {
            const categories = await Category.find({
                name: { $regex: categoryName, $options: 'i' }, // Case-insensitive partial match
            });
            const categoryIds = categories.map((category) => category._id);
            query.category_id = { $in: categoryIds };
        }

        // Filter by laptop name
        if (laptopName) {
            query.name = { $regex: laptopName, $options: 'i' }; // Case-insensitive partial match
        }

        // Filter by CPU
        if (cpu) {
            query.cpu = { $regex: cpu, $options: 'i' }; // Case-insensitive match
        }

        // Filter by GPU
        if (gpu) {
            query.gpu = { $regex: gpu, $options: 'i' }; // Case-insensitive match
        }

        // Filter by RAM
        if (ram) {
            query.ram = { $regex: ram, $options: 'i' }; // Case-insensitive match
        }

        // Filter by Storage
        if (storage) {
            query.storage = { $regex: storage, $options: 'i' }; // Case-insensitive match
        }

        // Filter by Rate
        if (rate) {
            query.rate = parseFloat(rate); // Exact match for rate
        }

        if (displaySize) {
            query.displaySize = { $regex: displaySize, $options: 'i' }; // Case-insensitive match
        }

        // Determine sort order
        const sortOrder = sort === 'desc' ? -1 : 1; // Default to ascending if sort is not provided

        // Pagination
        const skip = (page - 1) * limit;
        const laptops = await Laptop.find(query)
            .sort({ price: sortOrder }) // Sort by price
            .skip(skip)
            .limit(parseInt(limit));

        const totalLaptops = await Laptop.countDocuments(query);

        res.status(200).json({
            totalLaptops,
            totalPages: Math.ceil(totalLaptops / limit),
            currentPage: parseInt(page),
            laptops,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptops', error: error.message });
    }
};

// Add a new laptop
const addLaptop = async (req, res) => {
    try {
        const photo = req.file ? req.file.path : DEFAULT_LAPTOP_PHOTO;
        const newLaptop = await Laptop.create({ ...req.body, photo });
        res.status(201).json({ message: 'Laptop added successfully', laptop: newLaptop });
    } catch (error) {
        res.status(400).json({ message: 'Error adding laptop', error: error.message });
    }
};

// Update laptop by ID
const updateLaptopById = async (req, res) => {
    try {
        const updatedLaptop = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLaptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }
        res.status(200).json({ message: 'Laptop updated successfully', laptop: updatedLaptop });
    } catch (error) {
        res.status(500).json({ message: 'Error updating laptop', error: error.message });
    }
};

// Delete laptop by ID
const deleteLaptopById = async (req, res) => {
    try {
        const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
        if (!deletedLaptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }
        res.status(200).json({ message: 'Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting laptop', error: error.message });
    }
};

const uploadLaptopImage = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }
        if (laptop.photo && laptop.photo !== DEFAULT_LAPTOP_PHOTO) {
            // Extract the public ID of the old image from the Cloudinary URL
            const publicId = laptop.photo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId); // Delete the old image
        }
        laptop.photo = req.file.path;
        await laptop.save();
        res.status(200).json({ message: 'Laptop image uploaded successfully', laptop: laptop });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading laptop image', error: error.message });
    }
};

module.exports = {
    getLaptopById,
    getAllLaptops,
    addLaptop,
    updateLaptopById,
    deleteLaptopById,
    uploadLaptopImage
};

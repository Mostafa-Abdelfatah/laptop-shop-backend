const Laptop = require('../models/Laptop');

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
const getAllLaptops = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const laptops = await Laptop.find().skip(skip).limit(limit);
        const totalLaptops = await Laptop.countDocuments();

        res.status(200).json({
            totalLaptops,
            totalPages: Math.ceil(totalLaptops / limit),
            currentPage: page,
            laptops,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptops', error: error.message });
    }
};

// Get laptops by partial name match with pagination
const getLaptopsByName = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = req.params.name;

        const laptops = await Laptop.find({
            name: { $regex: query, $options: 'i' },
        })
            .skip(skip)
            .limit(limit);

        const totalLaptops = await Laptop.countDocuments({
            name: { $regex: query, $options: 'i' },
        });

        if (laptops.length === 0) {
            return res.status(404).json({ message: 'No laptops found with this name' });
        }

        res.status(200).json({
            totalLaptops,
            totalPages: Math.ceil(totalLaptops / limit),
            currentPage: page,
            laptops,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptops', error: error.message });
    }
};


// Add a new laptop
const addLaptop = async (req, res) => {
    try {
        const newLaptop = new Laptop(req.body);
        await newLaptop.save();
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

const getLaptopsByCategoryId = async (req, res) => {
    try {
        const { id } = req.params; // Extract category ID from URL
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const laptops = await Laptop.find({ category_id: id })
            .skip(skip)
            .limit(limit);

        const totalLaptops = await Laptop.countDocuments({ category_id: id });

        if (laptops.length === 0) {
            return res.status(404).json({ message: 'No laptops found for this category' });
        }

        res.status(200).json({
            totalLaptops,
            totalPages: Math.ceil(totalLaptops / limit),
            currentPage: page,
            laptops,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptops by category', error: error.message });
    }
};

const getLaptopsByBrandId = async (req, res) => {
    try {
        const { id } = req.params; // Extract brand ID from URL
        const page = parseInt(req.query.page) || 1; // Current page number
        const limit = parseInt(req.query.limit) || 10; // Number of items per page
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const laptops = await Laptop.find({ brand_id: id })
            .skip(skip)
            .limit(limit);

        const totalLaptops = await Laptop.countDocuments({ brand_id: id });

        if (laptops.length === 0) {
            return res.status(404).json({ message: 'No laptops found for this brand' });
        }

        res.status(200).json({
            totalLaptops,
            totalPages: Math.ceil(totalLaptops / limit),
            currentPage: page,
            laptops,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching laptops by brand', error: error.message });
    }
};

module.exports = { getLaptopsByBrandId };


module.exports = {
    getLaptopById,
    getAllLaptops,
    getLaptopsByName,
    addLaptop,
    updateLaptopById,
    deleteLaptopById,
    getLaptopsByCategoryId,
    getLaptopsByBrandId,
};

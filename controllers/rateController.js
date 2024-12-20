const Rate = require('../models/Rate');
const Laptop = require('../models/Laptop')
const {Types} = require("mongoose");

const addRate = async (req, res) => {
    try {
        const newRate = new Rate(req.body);
        await newRate.save();

        // Update the laptop's average rate
        await updateLaptopAverageRate(newRate.laptop_id);

        res.status(201).json({ message: 'Rating added successfully', rate: newRate });
    } catch (error) {
        res.status(500).json({ message: 'Error adding rate', error: error.message });
    }
};


// Get all rates with pagination
const getAllRates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const rates = await Rate.find().skip(skip).limit(limit);
        const totalRates = await Rate.countDocuments();

        res.status(200).json({
            totalRates,
            totalPages: Math.ceil(totalRates / limit),
            currentPage: page,
            rates,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rates', error: error.message });
    }
};

// Get rate by ID
const getRateById = async (req, res) => {
    try {
        const { id } = req.params;
        const rate = await Rate.findById(id);

        if (!rate) {
            return res.status(404).json({ message: 'Rate not found' });
        }

        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rate by ID', error: error.message });
    }
};

// Get rates by user ID with pagination
const getRatesByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const rates = await Rate.find({ user_id }).skip(skip).limit(limit);
        const totalRates = await Rate.countDocuments({ user_id });

        res.status(200).json({
            totalRates,
            totalPages: Math.ceil(totalRates / limit),
            currentPage: page,
            rates,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rates by user ID', error: error.message });
    }
};

// Get rates by laptop ID with pagination
const getRatesByLaptopId = async (req, res) => {
    try {
        const { laptop_id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const rates = await Rate.find({ laptop_id }).skip(skip).limit(limit);
        const totalRates = await Rate.countDocuments({ laptop_id });

        res.status(200).json({
            totalRates,
            totalPages: Math.ceil(totalRates / limit),
            currentPage: page,
            rates,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rates by laptop ID', error: error.message });
    }
};

const updateRateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rate, comment } = req.body;

        const existingRate = await Rate.findById(id);
        if (!existingRate) {
            return res.status(404).json({ message: 'Rate not found' });
        }

        // Update the rate
        const updatedRate = await Rate.findByIdAndUpdate(
            id,
            { rate, comment, Date_updated: new Date() },
            { new: true }
        );

        // Update the laptop's average rate
        await updateLaptopAverageRate(existingRate.laptop_id);

        res.status(200).json({ message: 'Rate updated successfully', rate: updatedRate });
    } catch (error) {
        res.status(500).json({ message: 'Error updating rate', error: error.message });
    }
};

const deleteRateById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRate = await Rate.findByIdAndDelete(id);
        if (!deletedRate) {
            return res.status(404).json({ message: 'Rate not found' });
        }

        // Update the laptop's average rate
        await updateLaptopAverageRate(deletedRate.laptop_id);

        res.status(200).json({ message: 'Rate deleted successfully', rate: deletedRate });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rate', error: error.message });
    }
};



const updateLaptopAverageRate = async (laptopId) => {
    try {
        // Calculate the new average rate
        const result = await Rate.aggregate([
            { $match: { laptop_id: new Types.ObjectId(laptopId) } }, // Use 'new' with ObjectId
            { $group: { _id: "$laptop_id", averageRate: { $avg: "$rate" } } },
        ]);
        console.log(laptopId)

        const averageRate = result.length > 0 ? result[0].averageRate : 0;
        console.log(averageRate)

        // Update the laptop with the new average rate
        await Laptop.findByIdAndUpdate(laptopId, { rate: averageRate });
    } catch (error) {
        console.error("Error updating laptop average rate:", error.message);
        throw error;
    }
};




module.exports = {
    addRate,
    getAllRates,
    getRateById,
    getRatesByUserId,
    getRatesByLaptopId,
    updateRateById,
    deleteRateById,
};


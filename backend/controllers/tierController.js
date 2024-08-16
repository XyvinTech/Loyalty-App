const Tier = require('../models/tier');
const moment = require('moment');

// Create a new tier
exports.createTier = async (req, res) => {
    try {
        const gettier = await Tier.findOne({ tier_name: req.body.tier_name });
        if (gettier) {
            return res.status(400).send({ status: false, message: 'Tier already exists' });
        }
        const tier = new Tier(req.body);
        await tier.save();
        res.status(201).send({ status: true, tier });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

// Get all tiers
exports.getTier = async (req, res) => {
    try {
        const tiers = await Tier.find();
        const formatData = tiers.map(tier => ({
            _id: tier._id,
            tierName: tier.tier_name,
            pointLevel: tier.point_level,
            createdAt: moment.utc(tier.createdAt).format("D/M/YYYY"),
        }));
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

// Get tier by ID
exports.getTierById = async (req, res) => {
    try {
        const tier = await Tier.findById(req.params.id);
        if (!tier) {
            return res.status(404).send({ status: false, message: 'Tier not found' });
        }
        const formatData = {
            _id: tier._id,
            tierName: tier.tier_name,
            pointLevel: tier.point_level,
            createdAt: moment.utc(tier.createdAt).format("D/M/YYYY"),
        };
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

// Edit tier
exports.editTier = async (req, res) => {
    try {
        const tier = await Tier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tier) {
            return res.status(404).send({ status: false, message: 'Tier not found' });
        }
        res.status(200).send({ status: true, message: "Successfully edited" });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

// Delete tier
exports.deleteTier = async (req, res) => {
    try {
        const tier = await Tier.findByIdAndDelete(req.params.id);
        if (!tier) {
            return res.status(404).send({ status: false, message: 'Tier not found' });
        }
        res.status(200).send({ status: true, message: "Successfully deleted" });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

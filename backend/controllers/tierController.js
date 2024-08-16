const Tier = require('../models/tier')
const moment = require('moment')

// Create a new tier
exports.createTier = async (req, res) => {
    try {
        const gettier = await Tier.findOne({tier_name:req.body.tier_name})
        if (gettier) {
            
            return res.status(500).send({status:false,message:'already have tier'});
        }
        const tier = new Tier(req.body);
        await tier.save();
        res.status(201).send({status:true,tier});
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get tier
exports.getTier = async (req, res) => {
    try {
        const tiers = await Tier.find()
        let formatData = tiers.map(tier => (
            {
                _id: tier._id,
                tierName: tier.tier_name,
                pointLevel: tier.point_level,
                createdAt: moment.utc(tier.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        res.status(500).send(error);
    }
};

// exports.getTierById = async (req, res) => {
//     try {
//         const tier = await Tier.findById(req.params.id)
//         let formatData = 
//             {
//                 _id: tier._id,
//                 tierName: tier.tier_name,
//                 pointLevel: tier.point_level,
//                 createdAt: moment.utc(tier.createdAt).format("D/M/YYYY"),
//             }
//         res.status(200).send({status:true,result:formatData});
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// edit tier
exports.editTier = async (req, res) => {
    try {
        await Tier.findByIdAndUpdate({ _id: req.params.id },req.body)
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

// delete tier
exports.deleteTier = async (req, res) => {
    try {
        await Tier.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};
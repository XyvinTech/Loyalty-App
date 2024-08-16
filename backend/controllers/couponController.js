
const Coupon = require('../models/coupon.model')
const moment = require('moment')

//create coupon

exports.createCoupon = async (req, res) => {
    try {
        const getCoupon = await Coupon.findOne({title:req.body.title})
        if (getCoupon) {
            res.status(500).send({status:false,message:'already have a coupon'});
            return
        }
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).send({status:true,coupon});
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get coupon
exports.getCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        let formatData = coupons.map(cou => (
            {
                _id: cou._id,
                title: cou.title,
                description: cou.description,
                brand: cou.brand,
                image: cou.image,
                otp: cou.OTP,
                pointsRequired: cou.points_required,
                coinCost: cou.coin_cost,
                startsFrom: cou.starts_from,
                expiry: cou.expiry,
                noOfCards: cou.no_of_cards,
                availabilityCriteria: cou.availability_criteria,
                category : cou.category,
                status: cou.status,
                createdAt: moment.utc(cou.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        res.status(500).send(error);
    }
};

// edit title of coupon
exports.editCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};
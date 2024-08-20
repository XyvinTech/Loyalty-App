
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
        let value = req.body
        value.category = value.category.value
        value.brand = value.brand.value
        value.availability_criteria = value.availability_criteria.label

        const coupon = new Coupon(value);
        await coupon.save();
        res.status(201).send({status:true,coupon});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Get coupon
exports.getCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find()
        .populate({
          path: 'category',
          select: 'title' // Select only the title from category
        })
        .populate({
          path: 'brand',
          select: 'title' // Select only the name from brand (or any relevant field)
        })
        .exec();
        let formatData = coupons.map(cou => (
            {
                _id: cou._id,
                title: cou.title,
                description: cou.description,
                brand: cou.brand.title,
                image: cou.image,
                otp: cou.otp,
                pointsRequired: cou.points_required,
                coinCost: cou.coin_cost,
                startsFrom: cou.starts_from,
                expiry: cou.expiry,
                noOfCards: cou.no_of_cards,
                availabilityCriteria: cou.availability_criteria,
                category : cou.category.title,
                status: cou.status,
                createdAt: moment.utc(cou.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        res.status(500).send(error);
    }
};

// edit coupon
exports.editCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true })
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//delete coupon
exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};
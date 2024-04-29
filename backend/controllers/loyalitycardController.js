const Loyality = require('../models/loyaltyCard')

// jobsController.js

// Create a new job
exports.createCard = async (req, res) => {
    try {
        const loyaltyCard = new Loyality(req.body);
        await loyaltyCard.save();
        res.status(201).send({ status: true, result: loyaltyCard });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};

// Get all cards for admin
exports.getAllCards = async (req, res) => {
    try {
        const loyaltyCard = await Loyality.find().populate('category').populate('brand').sort({ createdAt: 1 });
        let formatData = loyaltyCard.map(card => (
            {
                _id: card._id,
                title: card.title,
                brand: card.brand.title,
                brand_logo: card.brand.logo,
                image: card.image,
                vendor: card.vendor,
                worth: card.worth,
                expiry: card.expiry,
                no_of_cards: card.no_of_cards,
                category: card.category.title,
                status: new Date() > new Date(card.expiry) ? "expired" : card.status
            }))
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get active cards for users with category filter
exports.getCards = async (req, res) => {
    const match = {};
    if (req.query.category) {
        match.category = req.query.category
    }
    try {
        const loyaltyCard = await Loyality.find(match).populate('category').populate('brand');
        let formatData = loyaltyCard.filter((card) => {
            if (new Date() <= new Date(card.expiry)) {
                return ({
                    _id: card._id,
                    title: card.title,
                    brand: card.brand.title,
                    brand_logo: card.brand.logo,
                    image: card.image,
                    vendor: card.vendor,
                    worth: card.worth,
                    expiry: card.expiry,
                    no_of_cards: card.no_of_cards,
                    category: card.category.title,
                })
            }
        })
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.editCard = async (req, res) => {
    try {
        await Loyality.findByIdAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, returnOriginal: false, useFindAndModify: false });
        res.status(200).send({ status: true, message: 'Updated Successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.otpCheck = async (req, res) => {
    try {
        const { otp } = req.body
        const checkOtp = await Loyality.findOne({OTP: otp}).select("coin_worth");
        if(checkOtp){
            res.status(200).send({ status: true, message: "OTP verified successfully", data:checkOtp});
        }else{
            res.status(400).send({ message: "OTP verification failed"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

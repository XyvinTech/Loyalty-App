const Category = require('../models/category')
const moment = require('moment');

// jobsController.js

// Create a new job
exports.createCategory = async (req, res) => {
    try {
        const getCat = await Category.findOne({title:req.body.title})
        if (getCat) {
            res.status(500).send({status:false,message:'same category already added'});
            return
        }
        const category = new Category(req.body);
        await category.save();
        res.status(201).send({status:true,category});
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get category
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        let formatData = category.map(cat => (
            {
                _id: cat._id,
                title: cat.title,
                createdAt: moment.utc(cat.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        res.status(500).send(error);
    }
};

// edit title of category
exports.editCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate({ _id: req.params.id },{title:req.body.title})
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};
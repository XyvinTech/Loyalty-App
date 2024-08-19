const Brand = require('../models/brand')
const moment = require ('moment')

// Create a new brand
exports.createBrand= async (req, res) => {
    try {
        const getbrand = await Brand.findOne({title:req.body.title})
        if (getbrand) {
            res.status(500).send({status:false,message:'same Brand Name already added'});
            return
        }
        const brand = new Brand(req.body);
        await brand.save();
        res.status(201).send({status:true,brand});
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get brand
exports.getBrand = async (req, res) => {
    try {
        const brands = await Brand.find()
        let formatData = brands.map(brand => (
            {
                _id: brand._id,
                title: brand.title,
                logo: brand.logo,
                createdAt: moment.utc(brand.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({status:true,result:formatData});
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

//get brand by id
exports.getBrandById = async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
        return res.status(404).send({ status: false, error: "Brand not found" });
      }
      res.status(200).send({ status: true, data: brand });
    } catch (error) {
      res.status(500).send(error);
    }
  };

// edit category
exports.editBrand = async (req, res) => {
    try {
        await Brand.findByIdAndUpdate({ _id: req.params.id },req.body)
        res.status(200).send({status:true,message:"Successfully edited"});
    } catch (error) {
        res.status(500).send(error);
    }
};

//delete brand
exports.deleteBrand = async (req, res) => {
    try {
        await Brand.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send({status:true,message:"Successfully deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
};
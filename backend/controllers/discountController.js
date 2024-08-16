const Discount = require("../models/discount.model.");
const moment = require("moment");

// create discount
exports.createDiscount = async (req, res) => {
  try {
    const getdiscount = await Discount.findOne({ title: req.body.title });
    if (getdiscount) {
      res
        .status(500)
        .send({ status: false, message: "already have a discount" });
      return;
    }
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).send({ status: true, discount });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get discount
exports.getDiscount = async (req, res) => {
  try {
    const discounts = await Discount.find();
    let formatData = discounts.map((discount) => ({
      _id: discount._id,
      title: discount.title,
      DiscountCode: discount.discount_code,
      description: discount.description,
      percentage: discount.percentage,
      image: discount.image,
      tierRequired: discount.tier_required,
      validFrom: discount.valid_from,
      validTo: discount.valid_to,
      status: discount.status,
      createdAt: moment.utc(discount.createdAt).format("D/M/YYYY"),
    }));
    res.status(200).send({ status: true, result: formatData });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get discount by id
exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    let formatData = {
      _id: discount._id,
      title: discount.title,
      DiscountCode: discount.discount_code,
      description: discount.description,
      percentage: discount.percentage,
      image: discount.image,
      tierRequired: discount.tier_required,
      validFrom: discount.valid_from,
      validTo: discount.valid_to,
      status: discount.status,
      createdAt: moment.utc(discount.createdAt).format("D/M/YYYY"),
    };
    res.status(200).send({ status: true, result: formatData });
  } catch (error) {
    res.status(500).send(error);
  }
};

// edit discount
exports.editDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).send({ status: true, message: "Successfully edited" });
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete discount
exports.deleteDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ status: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

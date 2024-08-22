const Discount = require("../models/discount.model");
const moment = require("moment");
const User = require("../models/user")
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
    console.log('body : ', req.body)
    let payload = {
      ...req.body,
      // tier_required: req.body.tierRequired.value,
      status: "active",
      discount_code: req.body.DiscountCode,
      valid_from: req.body.validFrom,
      valid_to: req.body.validTo
    };
    payload.apps = payload.apps.map(app => app.value);
    payload.tier_required = payload.tierRequired.map(tier => tier.value);

    console.log('payload : ' , payload , 'payload -tier : ' , payload.tier_required)

    const discount = new Discount(payload);
    await discount.save();
    res.status(201).send({ status: true, discount });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get discount
exports.getDiscount = async (req, res) => {
  try {

    let userId = req.params.userId;
    //! TODO filter by userTier
    const discounts = await Discount.find()
      .populate({
        path: 'tier_required',
        select: 'tier_name'
      })
      .exec();

    console.log(discounts);


    let formatData = discounts.map(
      (discount) => (
        console.log(discount.tier_required[0]?.tier_name),
        {
          _id: discount._id,
          title: discount.title,
          discountCode: discount.discount_code,
          description: discount.description,
          percentage: discount.percentage,
          image: discount.image,
          tierRequired: discount.tier_required[0]?.tier_name,
          validFrom: discount.valid_from,
          validTo: discount.valid_to,
          status: discount.status,
          createdAt: moment.utc(discount.createdAt).format("D/M/YYYY"),
        }
      )
    );

    res.status(200).send({ status: true, result: formatData });
  } catch (error) {
    console.log(error);
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


exports.redeemDiscount = async (req, res) => {
  try {
    const { discountId, userId, note } = req.body;
    const userDetails = await User.findOne({ _id: userId })
    const discountTier = await Discount.findById(discountId)

    if (discountTier.tier_required !== userDetails.tier) throw new Error("Cant redeem Discount")
    const transactionData = {

      userId: userId,
      type: "discount",
      relatedId: discountId,

      note: note ? note : ""
    };


    await createTransaction(transactionData);

    res.status(200).send({ status: true, message: "Discount Applied" });

  } catch (error) {
    res.status(500).send(error);
  }
};
// const Loyality = require("../models/loyaltyCard");
// const moment = require("moment");
// const { v4: uuidv4 } = require("uuid");
// const Transaction = require("../models/transaction");
// const Category = require("../models/category");
// const { log } = require("console");
// // jobsController.js

// // Create a new job
// exports.createCard = async (req, res) => {
//   try {
//     const loyaltyCard = new Loyality(req.body);
//     log(req.body)
//     await loyaltyCard.save();
//     res.status(201).send({ status: true, result: loyaltyCard });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// };

// // Get all cards for admin
// exports.getAllCards = async (req, res) => {
//   try {
//     const loyaltyCards = await Loyality.find()
//       .populate("category")
//       .populate("brand")
//       .sort({ createdAt: 1 });
//     const isCardExpired = (card) => moment() > moment(card.expiry, "D/M/YYYY");

//     const updatePromises = [];
//     const formattedCards = loyaltyCards.map((card) => {
//       const cardData = {
//         _id: card._id,
//         title: card.title,
//         description: card.description,
//         brand: card.brand.title,
//         brand_logo: card.brand.logo,
//         image: card.image,
//         OTP: card.OTP,
//         coin_worth: card.coin_worth,
//         coin_cost: card.coin_cost,
//         expiry: card.expiry,
//         no_of_cards: card.no_of_cards,
//         category: card.category.title,
//         status: isCardExpired(card) ? "expired" : card.status,
//       };

//       if (isCardExpired(card) && card.status !== "expired") {
//         const updatePromise = Loyality.findByIdAndUpdate(card._id, { status: "expired" });
//         updatePromises.push(updatePromise);
//       }

//       return cardData;
//     });
//     await Promise.all(updatePromises);
//     res.status(200).send({ status: true, result: formattedCards });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get active cards for users with category filter
// exports.getCards = async (req, res) => {
//   const match = {
//     status: "active",
//   };
//   console.log(req.query);
//   if (req.query.category) {
//     try {
//       const category = await Category.findOne({ title: req.query.category });
//       if (!category) {
//         return res.status(404).send("Category not found");
//       }
//       match.category = category._id;
//     } catch (err) {
//       return res.status(500).send("Error fetching category");
//     }
//   }

//   try {
//     const loyaltyCards = await Loyality.find(match).populate("category").populate("brand");
//     let formattedData = loyaltyCards
//       .filter((card) => moment().format("D/M/YYYY") >= card.expiry)
//       .map((card) => ({
//         _id: card._id,
//         title: card.title,
//         description: card.description,
//         brand: card.brand ? card.brand.title : "",
//         brand_logo: card.brand ? card.brand.logo : "",
//         image: card.image,
//         category: card.category ? card.category.title : "",
//       }));
//     res.status(200).send({ status: true, result: formattedData, messege: "ok" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.editCard = async (req, res) => {
//   try {
//     await Loyality.findByIdAndUpdate({ _id: req.params.id }, req.body, {
//       runValidators: true,
//       returnOriginal: false,
//       useFindAndModify: false,
//     });
//     res.status(200).send({ status: true, message: "Updated Successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.getCardById = async (req, res) => {
//   try {
//     const data = await Loyality.findById({ _id: req.params.id });
//     res.status(200).send({ status: true, data });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.otpCheck = async (req, res) => {
//   try {
//     const { loyalityId, otp, clientId, note } = req.body;
//     const checkOtp = await Loyality.findOne({ _id: loyalityId, OTP: otp }).select("coin_worth");
//     const transactionData = {
//       transactionId: uuidv4(),
//       loyality_card: loyalityId,
//       clientId,
//       note: note ? note : {},
//       status: checkOtp ? "success" : "failed",
//       amount: checkOtp ? checkOtp.coin_worth : 0,
//     };
//     await Transaction.create(transactionData);
//     if (checkOtp) {
//       await Loyality.updateOne({ _id: loyalityId }, { $inc: { no_of_cards: -1 } });
//       res.status(200).send({ status: true, message: "OTP verified successfully", data: checkOtp });
//     } else {
//       res.status(400).send({ status: false, message: "OTP verification failed" });
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// exports.getCardByBrand = async (req, res)=>{
//   try {
//     const { category } = req.query;
//     let filter = {};
//     if(category){
//       filter.category = category;
//     }
//     const findCard = await Loyality.find(filter).populate("brand");
//         const cardsByBrandId = {};

//         findCard.forEach((card) => {
//           const brandId = card.brand ? card.brand._id.toString() : 'Unknown';
    
//           if (!cardsByBrandId[brandId]) {
//             cardsByBrandId[brandId] = [];
//           }
    
//           cardsByBrandId[brandId].push({
//             _id: card._id,
//             title: card.title,
//             description: card.description,
//             brandId: brandId,
//             brandName: card.brand ? card.brand.title : 'Unknown',
//             brand_logo: card.brand ? card.brand.logo : null,
//             image: card.image,
//             category: card.category ? card.category.title : 'Unknown'
//           });
//         });
    
//         const arrangedData = Object.keys(cardsByBrandId).map((brandId) => ({
//           brandName: cardsByBrandId[brandId][0].brandName,
//           cards: cardsByBrandId[brandId]
//         }));
    
//     res.status(200).send({ status: true, result: arrangedData, messege: "ok" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

// exports.deleteCard = async(req, res) => {
//   let id = req.params.id
//   await Loyality.findByIdAndDelete(id)
//   res.status(200).send({"data":"Deleted Successfully"})
// };
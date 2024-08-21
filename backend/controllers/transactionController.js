const Transaction = require('../models/transaction')
const moment = require('moment');
const User = require('../models/user');
const Coupon = require('../models/coupon.model')
const Discount = require('../models/discount.model');
const PointsCriteria = require('../models/pointsCriteria.model');
const { v4: uuidv4 } = require("uuid");


// Get all cards for admin
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate({
                path: "couponId",
                select: "title", // replace with actual fields you need
                
            })
            .populate({
                path: "discountId",
                select: "title", // replace with actual fields you need
              
            })
            .populate({
                path: "pointCriteriaId",
                select: "title", // replace with actual fields you need
               
            })
            .populate("userId", "email") // populate user details
            .lean() // convert the result to plain JavaScript objects
            .exec();
     // Format the transactions
     const formattedTransactions = transactions.map((transaction) => {
        let details = {};
        if (transaction.transactionType === "coupon") {
          details = transaction.couponId;
        } else if (transaction.transactionType === "discount") {
          details = transaction.discountId;
        } else if (transaction.transactionType === "earn") {
          details = transaction.pointCriteriaId;
        }
  
        return {
          transactionId: transaction.transactionId,
          user: transaction.userId.email,
          status: transaction.status,
          type: transaction.transactionType,
          date:transaction.createdAt,
          details:details.title, // add the specific details based on the transaction type
        };
      });

        res.status(200).send({ status: true, result: formattedTransactions });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};


exports.createTransaction = async ({ userId, type, relatedId, pointsRedeemed = 0, note = "" }) => {
    try {
      let transactionData = {
        transactionId: uuidv4(),
        userId: userId,
        status: "success",
        transactionType: type,
        pointsRedeemed: pointsRedeemed,
        note: note,
      };
  
      // Set the appropriate ID field based on the transaction type
      if (type === "coupon") {
        transactionData.couponId = relatedId;
      } else if (type === "discount") {
        transactionData.discountId = relatedId;
      } else if (type === "earn") {
        transactionData.pointCriteriaId = relatedId;
      } else {
        throw new Error("Invalid transaction type");
      }
  
      // Create the transaction in the database
      const transaction = await Transaction.create(transactionData);
  
      return transaction;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };
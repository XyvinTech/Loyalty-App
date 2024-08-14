const Transaction = require('../models/transaction')
const moment = require('moment');
const User = require('../models/user');


// Get all cards for admin
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("loyality_card");
        let formatData = transactions.map(transac => (
            {
                _id: transac._id,
                transactionId: transac.transactionId,
                market: transac.market,
                loyality: transac.loyality_card._id,
                amount: transac.loyality_card.coin_worth,
                customer: transac.clientId,
                status: transac.status,
                createdAt: moment.utc(transac.createdAt).format("D/M/YYYY"),
            }))
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send(error);
    }
};

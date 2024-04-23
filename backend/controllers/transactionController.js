const Transaction = require('../models/transaction')



// Get all cards for admin
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("Loyality");
        let formatData = transactions.map(transac => (
            {
                _id: transac._id,
                market: transac.market,
                loyality: transac.loyality.title,
                amount: transac.loyality.worth,
                customer: transac.customer_details,
                status: transac.status,
                createdAt: transac.createdAt,
            }))
        res.status(200).send({ status: true, result: formatData });
    } catch (error) {
        res.status(500).send(error);
    }
};


const User = require("../models/user");

exports.handlePurchase = async (req, res) => {
  console.log("handlePurchase hitted");
  try {
    const { userId, amount, pointsRedeemed } = req.body;
    const user = await User.findById(userId).populate("referredUserId");
    // If points were used in the purchase, deduct them from the user's points
    if (pointsRedeemed && pointsRedeemed > 0) {
      if (user.points < 1000 || user.points < pointsRedeemed || amount < 500) {
        return res
          .status(400)
          .send({ status: false, message: "Insufficient points or amount" });
      }
      user.points -= pointsRedeemed;
    }
    // Check if the purchase amount is at least Rs 500 and if it's the first purchase
    if (amount >= 500 && user.referredUserId && !user.referralPointsAwarded) {
      // Add 2000 points to both the referrer and the user
      user.points += 2000;
      user.referralPointsAwarded = true; // Mark points as awarded
      await user.save();
      const referrer = await User.findById(user.referredUserId._id);
      referrer.points += 2000;
      await referrer.save();
      return res
        .status(200)
        .send({ status: true, message: "Referral points added successfully" });
    }
    // For all other purchases, add 10% of the total amount as points
    if (amount >= 500) {
      user.points += Math.floor(amount * 0.1);
      await user.save();
    }
    res
      .status(200)
      .send({ status: true, message: "Purchase handled successfully", user });
  } catch (error) {
    console.log("got error", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

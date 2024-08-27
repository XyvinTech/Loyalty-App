const User = require("../models/user");
const Tier = require('../models/tier');
const cron = require('node-cron');

// Create user  
exports.createUser = async (req, res) => {
  console.log('createUser hitted')
  try {
    const { email, phoneNumber, referralCode, clientCompany } = req.body;

    // Check if the user exists by either email or phone number and Client Company
    const userExist = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
      clientCompany: clientCompany,
    });

    if (userExist) {
      return res.status(400).send({
        status: false,
        error: "User with this email or phone number already exists",
        userExist,
      });
    }

    // Handle referral code if provided
    let referredUserId = null;

    if (referralCode) {
      const referringUser = await User.findOne({ referralCode: referralCode });

      if (referringUser) {
        referredUserId = referringUser._id;
      } else {
        referredUserId = null;
        console.log("no referral found")
      }
    }

    // Create a new user with 500 points as a starting bonus
    const basicPlan = await Tier.findOne({ tier_name: "Basic" })
    const newUser = new User({
      ...req.body,
      points: 500, // Assign 500 points to new user
      referredUserId: referredUserId,
      tier: basicPlan._id
    });
    await newUser.save();
    newUser.referralCode = newUser._id;

    const updatedUser = await newUser.save();

    res.status(201).send({ status: true, data: updatedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find({})
    .select("-password_hash") // Exclude the password_hash field
    .populate({
      path: 'tier',
      select: 'tier_name' // Select only the tier_name
    })
    .exec();
    
    res.send({ status: true, result: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

// Get User details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Returns the updated document
      // runValidators: true, // Ensure the new data is validated
    });

    if (!updatedUser) {
      return res.status(404).send({ status: false, error: "User not found" });
    }

    res.send({ status: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};


// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
console.log("User deleted",id)
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ status: false, error: "User not found" });
    }

    res.send({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};



//cron


// Define the cron job to run at midnight every day
cron.schedule('*/100 * * * *', async () => {
  console.log('Running Tier Update Job');

  try {
    const tiers = await Tier.find().sort({ point_level: -1 });
    const users = await User.find();

    users.forEach(async (user) => {
      const userPoints = user.points;
      let newTier = '66c410d9dc7c19b0294a65a2';

      for (const tier of tiers) {
        if (userPoints >= tier.point_level) {
          newTier = tier._id;
          break;
        }
      }

      // Update the user's tier if it's different from the current one
      if (user.tier !== newTier) {
        await User.updateOne({ _id: user._id }, { tier: newTier });
        console.log(`Updated ${user.email} to tier ${newTier}`);
      }
    });
  } catch (error) {
    console.error('Error updating tiers:', error);
  }
});
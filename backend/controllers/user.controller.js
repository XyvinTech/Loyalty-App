const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const { email, phoneNumber, referralCode } = req.body;

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
        return res.status(400).send({
          status: false,
          error: "Invalid referral code",
        });
      }
    }

    // Create a new user with 500 points as a starting bonus
    const newUser = new User({
      ...req.body,
      points: 500, // Assign 500 points to new user
      referredUserId: referredUserId,
    });
    await newUser.save();

    res.status(201).send({ status: true, data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send({ status: false, error: error.message });
  }
};

// Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password_hash");
    res.send({ status: true, result: users });
  } catch (error) {
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

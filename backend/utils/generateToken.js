require('dotenv').config()
const jwt = require("jsonwebtoken");

const generateToken = async(id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {});
};

module.exports = generateToken;
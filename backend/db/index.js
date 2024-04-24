const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
mongoose
  .connect(MONGO_URL || "mongodb://127.0.0.1:27017/Loyalty_card")
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => console.log("Error connecting to DB", err));

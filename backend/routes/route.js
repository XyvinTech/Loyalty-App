const multer = require("multer");
const adminController = require("../controllers/adminsController");
const loyaltyController = require("../controllers/loyalitycardController");
const transactionController = require("../controllers/transactionController");
const uploadController = require("../controllers/uploadController");
const verifyToken = require("../middleware/verifyUser");
const User = require("../models/user");
const PointsCriteria = require("../models/pointsCriteria.model");
const ActionUser = require("../models/actionUser.model");

//~ Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only JPEG, PNG and PDF is allowed!"),
      false
    );
  }
};
//~ Create a multer instance with the defined filter
const upload = multer({ fileFilter: filter });

const router = require("express").Router();

//ROUTES

// admin
router.post("/api/admins/login", adminController.adminSignIn);
router.post("/api/admins", adminController.createAdmin);
router.get("/api/admins", verifyToken, adminController.getAllAdmin);
router.get("/api/admins/:id", verifyToken, adminController.getAdminDetails);
router.put("/api/admins/:id", verifyToken, adminController.editAdminDetails);
router.delete(
  "/api/admins/:id",
  verifyToken,
  adminController.deleteAdminDetails
);

//loyalty card

// router.route('/api/loyalitycard')
//     .get(verifyToken, loyaltyController.getCards)
//     .post(verifyToken, loyaltyController.createCard)

// router.get('/api/loyalitycard/admin', verifyToken, (loyaltyController.getAllCards))

// router.route('/api/loyalitycard/:id')
//     .put(verifyToken, loyaltyController.editCard)
//     .get(verifyToken, loyaltyController.getCardById)
//     .delete(verifyToken, loyaltyController.deleteCard)

//redeem card
// router.post('/api/redeemcard/otpCheck', verifyToken, loyaltyController.otpCheck)

//transaction
router
  .route("/api/transaction")
  .get(verifyToken, transactionController.getTransactions);

//upload
router.post(
  "/api/upload",
  upload.array("attachment"),
  verifyToken,
  uploadController.uploadImage
);

// router.get("/api/cards/brand", verifyToken, loyaltyController.getCardByBrand);

// Points to be awarded for each action
const POINTS_FOR_FACEBOOK_SHARE = 500;
const POINTS_FOR_INSTAGRAM_SHARE = 800;

router.post("/api/v1/trigger", async (req, res) => {
  const { action, userId } = req.body;
  console.log("Trigger hit"); //for debug

  if (!action) {
    return res.status(400).json({ error: "Action is required" });
  }

  const actionType = await PointsCriteria.findOne({ title: action });
  if (!actionType) {
    return res.status(400).json({ error: "Action not found in db" });
  }

  const actionPoint = actionType.points;

  try {
    const user = await User.findById(userId);
    // console.log(user); //for debug
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userLimit = await ActionUser.countDocuments({
      userId: user._id,
      action: actionType._id,
    });
    console.log("userLimit : " , userLimit )
    if (userLimit > actionType.limit) {
      return res
        .status(400)
        .json({ error: "User has already reached the limit for this action " });
    }
    const newAction = new ActionUser({
      userId: user._id,
      action: actionType._id,
    });
    await newAction.save();

    user.points += actionPoint;
    await user.save();

    res.status(200).json({
      message: `Action "${action}" triggered successfully`,
      totalPoints: user.points,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

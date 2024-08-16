const multer = require("multer");
const adminController = require("../controllers/adminsController");
const loyaltyController = require("../controllers/loyalitycardController");
const categoryController = require("../controllers/categoryController");
const couponController = require("../controllers/couponController");
const discountController = require("../controllers/discountController");
const brandController = require("../controllers/brandController");
const tierController = require("../controllers/tierController");
const transactionController = require("../controllers/transactionController");
const uploadController = require("../controllers/uploadController");
const verifyToken = require("../middleware/verifyUser");

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

//category
router
  .route("/api/category")
  .get(categoryController.getCategory)
  .post(categoryController.createCategory);

router
  .route("/api/category/:id")
  .put(categoryController.editCategory)
  .delete(categoryController.deleteCategory);

//coupon
router
  .route("/api/coupon")
  .get(couponController.getCoupon)
  .post(couponController.createCoupon);

router
  .route("/api/coupon/:id")
  .put(verifyToken, couponController.editCoupon)
  .delete(verifyToken, couponController.deleteCoupon);

//brand
router
  .route("/api/brand")
  .get(brandController.getBrand)
  .post(brandController.createBrand);

router
  .route("/api/brand/:id")
  .put(brandController.editBrand)
  .delete(brandController.deleteBrand);

//tier
router
  .route("/api/tier")
  .get(tierController.getTier)
  .post(tierController.createTier);

router
  .route("/api/tier/:id")
  .get(tierController.getTierById)
  .put(tierController.editTier)
  .delete(tierController.deleteTier);

//discount
router
  .route("/api/discount")
  .get( discountController.getDiscount)
  .post( discountController.createDiscount);

router
  .route("/api/discount/:id")
  .get(discountController.getDiscountById)
  .put( discountController.editDiscount)
  .delete( discountController.deleteDiscount);

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

module.exports = router;

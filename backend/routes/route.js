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

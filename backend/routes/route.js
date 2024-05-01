const multer = require("multer");
const adminController = require('../controllers/adminsController')
const loyaltyController = require('../controllers/loyalitycardController')
const categoryController = require('../controllers/categoryController')
const brandController = require('../controllers/brandController')
const transactionController = require('../controllers/transactionController');
const uploadController = require("../controllers/uploadController")
const verifyToken = require("../middleware/verifyUser");

//~ Define a filter function for multer file uploads
const filter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"|| file.mimetype === "image/webp") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG, PNG and PDF is allowed!"), false);
    }
  };
  //~ Create a multer instance with the defined filter
  const upload = multer({ fileFilter: filter });

const router = require('express').Router();

//ROUTES

// admin
router.post('/api/admins/login', (adminController.adminSignIn))
router.post('/api/admins', (adminController.createAdmin))
router.get('/api/admins',verifyToken, (adminController.getAllAdmin))
router.get('/api/admins/:id',verifyToken, (adminController.getAdminDetails))
router.put('/api/admins/:id',verifyToken, (adminController.editAdminDetails))
router.delete('/api/admins/:id',verifyToken, (adminController.deleteAdminDetails))


//category
router.route('/api/category')
    .get(verifyToken, categoryController.getCategory)
    .post(verifyToken, categoryController.createCategory)

router.route('/api/category/:id')
    .put(verifyToken, categoryController.editCategory)
    .delete(verifyToken, categoryController.deleteCategory)


//brand
router.route('/api/brand')
    .get(verifyToken, brandController.getBrand)
    .post(verifyToken, brandController.createBrand)

router.route('/api/brand/:id')
    .put(verifyToken, brandController.editBrand)
    .delete(verifyToken, brandController.deleteBrand)



//loyalty card

router.route('/api/loyalitycard')
    .get(verifyToken, loyaltyController.getCards)
    .post(verifyToken, loyaltyController.createCard)

router.route('/api/loyalitycard/:id')
    .put(verifyToken, loyaltyController.editCard)


router.get('/api/loyalitycard/admin',verifyToken, loyaltyController.getAllCards)

//redeem card
router.post('/api/redeemcard/otpCheck', verifyToken, loyaltyController.otpCheck)

//transaction
router.route('/api/transaction')
    .get(verifyToken, transactionController.getTransactions)

//upload
router.post(
        "/api/upload",
        upload.array("attachment"),
        verifyToken,
        uploadController.uploadImage
      );

module.exports = router
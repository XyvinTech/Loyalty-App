const adminController = require('../controllers/adminsController')
const loyaltyController = require('../controllers/loyalitycardController')
const categoryController = require('../controllers/categoryController')
const brandController = require('../controllers/brandController')
const transactionController = require('../controllers/transactionController')

const router = require('express').Router();

//ROUTES

// admin
router.post('/api/admins/login', (adminController.adminSignIn))
router.post('/api/admins', (adminController.createAdmin))
router.get('/api/admins', (adminController.getAllAdmin))
router.get('/api/admins/:id', (adminController.getAdminDetails))
router.put('/api/admins/:id', (adminController.editAdminDetails))
router.delete('/api/admins/:id', (adminController.deleteAdminDetails))


//category
router.route('/api/category')
    .get(categoryController.getCategory)
    .post(categoryController.createCategory)

router.route('/api/category/:id')
    .put(categoryController.editCategory)
    .delete(categoryController.deleteCategory)


//brand
router.route('/api/brand')
    .get(brandController.getBrand)
    .post(brandController.createBrand)

router.route('/api/brand/:id')
    .put(brandController.editBrand)
    .delete(brandController.deleteBrand)



//loyalty card

router.route('/api/loyalitycard')
    .get(loyaltyController.getCards)
    .post(loyaltyController.createCard)

router.route('/api/loyalitycard/:id')
    .put(loyaltyController.editCard)


router.get('/api/loyalitycard/admin', loyaltyController.getAllCards)

//redeem card
router.post('/api/redeemcard/otpCheck', loyaltyController.otpCheck)


module.exports = router
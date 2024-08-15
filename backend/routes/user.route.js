const userRouter = require('express').Router();
const { handlePurchase } = require('../controllers/referral.controller');
const userController = require('../controllers/user.controller')


userRouter.route('/user')
.get(userController.getAllUsers)
.post(userController.createUser)

userRouter.route('/user/:id')
.get(userController.getUserDetails)
.put(userController.updateUser)
.delete(userController.deleteUser)

userRouter.post('/purchase', handlePurchase)


module.exports = userRouter
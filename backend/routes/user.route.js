const userRouter = require('express').Router();
const userController = require('../controllers/user.controller')

userRouter.route('/user')
.get(userController.getAllUsers)
.post(userController.createUser)

userRouter.route('/user/:id')
.get(userController.getUserDetails)
.put(userController.updateUser)
.delete(userController.deleteUser)


module.exports = userRouter
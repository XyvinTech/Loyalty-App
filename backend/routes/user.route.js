const userRouter = require('express').Router();
const userController = require('../controllers/user.controller')


userRouter.post('/user', (userController.createUser))


module.exports = userRouter
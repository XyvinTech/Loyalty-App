const appRouter = require('express').Router()
const appController = require('../controllers/appController')

appRouter
.route('/app')
.get(appController.getApps)
.post(appController.createApp)

appRouter
.route('/app/:id')
.put(appController.editApp)
.delete(appController.deleteApp)

module.exports = appRouter  
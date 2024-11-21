const express = require('express')
const router = express.Router()
const controllers = require("../controllers")

router.get('/', controllers.initialRoutes.index)
router.get('/sign-up', controllers.initialRoutes.signUpPage)
router.get('/sign-in', controllers.initialRoutes.signInPage)
router.post('/sign-up', controllers.initialRoutes.signUp)
router.post('/sign-in', controllers.initialRoutes.signIn)


module.exports = router
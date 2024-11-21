const express = require('express')
const router = express.Router()
const controllers = require("../controllers")

router.get('/', controllers.initialRoutes.index)
router.get('/sign-up', controllers.initialRoutes.signUp)
router.get('/sign-in', controllers.initialRoutes.signIn)


module.exports = router
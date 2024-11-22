const express = require('express')
const router = express.Router()
const controllers = require("../controllers")


const isSignedIn = require("../middleware/is-signed-in.js")


router.get('/', isSignedIn, controllers.initialRoutes.index)
router.get('/sign-up', controllers.initialRoutes.signUpPage)
router.get('/sign-in', controllers.initialRoutes.signInPage)
router.post('/sign-up', controllers.initialRoutes.signUp)
router.post('/sign-in', controllers.initialRoutes.signIn)
router.get('/sign-out', controllers.initialRoutes.signOut)
router.get('/profile', controllers.initialRoutes.loggedInUserProfilePage)
router.put('/users/edit/profile', controllers.initialRoutes.updateLoggedInUserProfile)
router.get('/users/:userId', controllers.initialRoutes.viewOtherProfilePage)


module.exports = router
const express = require('express')
const router = express.Router()
const controllers = require("../controllers/index.js")


const isSignedIn = require("../middleware/is-signed-in.js")



//dont forget to protect this one using isSignedIn
router.get('/suggestions', isSignedIn,controllers.contributorsRoutes.showContributorsSuggestionsPage)

module.exports = router
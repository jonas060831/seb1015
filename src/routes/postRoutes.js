const express = require('express')
const router = express.Router()
const controllers = require("../controllers")

router.post('/', controllers.postRoutes.createPost)


module.exports = router
const express = require('express')
const router = express.Router()

const initialRoutes = require('./initialRoutes')


router.use('/', initialRoutes)

module.exports = router
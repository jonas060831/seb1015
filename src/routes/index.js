const express = require('express')
const router = express.Router()

const initialRoutes = require('./initialRoutes')

const postRoutes = require('./postRoutes')


router.use('/', initialRoutes)
router.use('/posts', postRoutes)

module.exports = router
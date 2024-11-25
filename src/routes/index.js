const express = require('express')
const router = express.Router()

const initialRoutes = require('./initialRoutes')

const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')
const contributorsRoutes = require('./contributorsRoutes')

router.use('/', initialRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)
router.use('/contributors', contributorsRoutes)

module.exports = router
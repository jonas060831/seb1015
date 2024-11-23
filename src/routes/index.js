const express = require('express')
const router = express.Router()

const initialRoutes = require('./initialRoutes')

const postRoutes = require('./postRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/', initialRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)

module.exports = router
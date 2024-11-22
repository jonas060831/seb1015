const express = require('express')
const router = express.Router()
const controllers = require("../controllers")

router.post('/', controllers.postRoutes.createPost)
router.delete('/:postId', controllers.postRoutes.deletePost)



module.exports = router
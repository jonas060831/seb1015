const express = require('express')
const router = express.Router()
const controllers = require("../controllers")

//middleware 
const isSignedIn = require('../middleware/is-signed-in.js')

router.post('/:postId', isSignedIn, controllers.commentRoutes.addCommentToAPost)
router.delete('/:commentId/delete/:postId', isSignedIn, controllers.commentRoutes.deleteCommentById)

module.exports = router
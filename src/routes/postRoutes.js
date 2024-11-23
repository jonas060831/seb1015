const express = require('express')
const router = express.Router()
const controllers = require("../controllers")
const multer = require("multer")

const upload = multer()

router.post('/', controllers.postRoutes.createPost)
router.delete('/:postId', controllers.postRoutes.deletePost)
router.post('/a-single-photo',upload.single('photo'), controllers.postRoutes.postASinglePhoto)
router.post('/a-single-video', upload.single('video'), controllers.postRoutes.postASingleVideo)



module.exports = router
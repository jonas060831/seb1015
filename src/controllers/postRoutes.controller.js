const models = require('../models')

const { Post } = models


const createPost = async (req, res) => {
    console.log(req.body)

    await Post.create(req.body)

    return res.redirect("/?succes=Posted!")
}

module.exports = {
    createPost
}
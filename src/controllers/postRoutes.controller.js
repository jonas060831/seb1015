const models = require('../models')

const { Post } = models


const createPost = async (req, res) => {
    console.log(req.body)

    await Post.create(req.body)

    return res.redirect("/?succes=Posted!")
}

const deletePost = async (req, res) => {
    const { postId } = req.params
    
    //make sure that only the session user deletes the post

    const postToDelete = await Post.findByIdAndDelete(postId).populate("postCreator")

    console.log(postToDelete.postCreator._id.toString() === req.session.user._id)

    //owner of the post so its ok to delete
    if(postToDelete.postCreator._id.toString() === req.session.user._id) return res.redirect("/?success=Deleted!")

    else return res.redirect("/?error=Error while deleting post")

} 

module.exports = {
    createPost,
    deletePost
}
const mongoose = require("mongoose")
const models = require('../models')


const { User, Post } = models

const addCommentToAPost = async(req, res) => {
    const { postId } = req.params
    const { commentText } = req.body
    const commenter = req.session.user
    const dateOfComment = new Date()

    
    // console.log(postId)
    // console.log(dateOfComment)
    // console.log(req.body.commentText)
    // console.log(commenter._id)

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    commentText: commentText,
                    commenterId: commenter._id,
                    createdAt: dateOfComment
                }
            }
        },
        { new: true }
        )
    
        return res.redirect(`/#${updatedPost._id}`)
    } catch (error) {
        console.log(error)
       return res.redirect(`/?error=Cannot Add Commment`) 
    }
}

const deleteCommentById = async (req, res) => {

    const { commentId, postId } = req.params

    await Post.updateOne(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } }
    )

    return res.redirect(`/#${postId}`)
}


module.exports = {
    addCommentToAPost,
    deleteCommentById
}
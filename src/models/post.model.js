const mongoose = require('mongoose')
const { Schema, model } = mongoose


const postSchema = new Schema({

    text: { type: String, required: false },
    content: { type: String, enum: ['photo', 'video', 'code', 'text'],required: false, default: 'text' },
    postCreator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    photoUrl: { type: String, required: false },
    videoUrl: { type: String, required: false },
    code: { type: String, required: false },
    comments: [ 
        { 
            commentText: { type: String, required: true },
            commenterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            createdAt: { type: Date, required: true }
        }
     ],
    agree: { type: Array, required: false },
    disagree: { type: Array, required: false }
},{ timestamps: true }) //shortcut for updatedAt and createdAt 

const Post = model('Post', postSchema)

module.exports = Post

const mongoose = require('mongoose')
const { Schema, model } = mongoose


const localSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false //set to select so it wont be added to query result
    }
})

const userSchema = new Schema({
    local: localSchema,
    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        picture: { type: String, required: true}
    }
},{ timestamps: true }) //shortcut for updatedAt and createdAt


const User = model('User', userSchema)

module.exports = User
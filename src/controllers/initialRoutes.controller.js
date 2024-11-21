const bcrypt = require("bcrypt");

const models = require('../models')
const { randomNumberGenerator } = require('../helpers')

const { User } = models


const index = async (req, res) => {


    const user = req.session.user
    //if there is no sign in user go and redirect to the login page
    if(!user) res.redirect('/sign-in')

    res.render("index.ejs", { user })
}

const signUpPage = async (req, res) => {


    console.log(req.body)
    res.render('auth/sign-up.ejs')
}

const signUp = async (req, res) => {


    //destructure the body
    let { username, password, confirmPassword, firstName, lastName } = req.body

    //assign a default image from /defaults/images
    const imageUrl = `/defaults/images/default_user_image_${randomNumberGenerator(1,4)}.png`

    //check if there is an existing user with that username
    const existingUser = await User.findOne({ "local.username":  username})
    if (existingUser) {
        return res.send("Username already taken.")
    }

    //check password
    if(password !== confirmPassword) return res.send('Password and Confirm Pasword must match')

    const hashedPassword = bcrypt.hashSync(password, 10)
    password = hashedPassword



    const userObject = {
        local: { username, password },
        profile: { firstName, lastName, picture: imageUrl }
    }

    const user = await User.create(userObject)

    res.send(`Thanks for signing up ${user.local.username}`)
}

const signInPage = async (req, res) => {
    res.render('auth/sign-in.ejs')
}

const signIn = async (req, res) => {

    const { username, password } = req.body

    const existingUser = await User.findOne({ "local.username": username })
    .select('+local.password')
    .exec()

    if(!existingUser) return res.send("Login failed. Please try again")
    
    //for some reason you cannot call .notation inside bcrypt.compareSync so i have to get the value out first and compare

    const validPassword =  bcrypt.compareSync(password, existingUser.local.password)

    //invalid password
    if(!validPassword) return res.send("Login failed. Please try again.")

    req.session.user = {
        username: existingUser.local.username,
        profile: existingUser.profile,
        _id: existingUser._id
    }

    res.redirect("/")
}



module.exports = {
    index,
    signUpPage,
    signInPage,
    signUp,
    signIn
}
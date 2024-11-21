const bcrypt = require("bcrypt");

const models = require('../models')
const { randomNumberGenerator, monthAndYearFromDateObject } = require('../helpers')

const { User } = models


const index = async (req, res) => {


    const user = req.session.user
    //if there is no sign in user go and redirect to the login page
    if(!user) res.redirect('/sign-in')

    const message  = req.query.message

    res.render("index.ejs", { user, message })
}

const signUpPage = async (req, res) => {

    const user = req.session.user

    //if there is a signed in user in the session redirect them to the landing page /
    if(user) return res.redirect("/?message=Sign Out first if you would like to create an account")

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
        profile: { firstName, lastName, picture: imageUrl },
    }

    await User.create(userObject)

    //now that we use Mongostore
    req.session.save(() => {
        res.redirect("/")
    })
}

const signInPage = async (req, res) => {

    const user = req.session.user

    if(user) res.redirect('/?message=Are you trying to login a different account ? If so Sign out first')

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
        createdAt: existingUser.createdAt,
        stringCreatedAt: monthAndYearFromDateObject(existingUser.createdAt),
        _id: existingUser._id
    }

    //now that we use Mongostore
    req.session.save(() => {
        res.redirect("/")
    })
}


const signOut = async(req, res ) => {
    req.session.destroy()
    res.redirect('/sign-in')
}
const loggedInUserProfilePage = async (req, res) => {

    const user = req.session.user

    //console.log(user)

    if(!user) res.redirect("/sign-in")

    res.render("users/profile.ejs", { user })
}

const updateLoggedInUserProfile = async (req, res) => {

    //update the current logged in user
    const { _id, profile } = req.session.user 
    const { firstName, lastName, aboutMe } = req.body


   try {
    const updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        picture: profile.picture,
        aboutMe: aboutMe
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: {'profile' : updatedProfile} },
        { new: true }
    )


    req.session.user = {
        username: updatedUser.local.username,
        profile: updatedUser.profile,
        createdAt: updatedUser.createdAt,
        stringCreatedAt: monthAndYearFromDateObject(updatedUser.createdAt),
        aboutMe: updatedUser.aboutMe,
        _id: updatedUser._id
    }

    

    return res.redirect(`/users/${req.session.user._id}`)

   } catch (error) {
        console.log(error)
   }

}

const viewOtherProfilePage = async(req, res) => {

    //get the req.query
    const { userId } = req.params
    //we know that there is a log in user for this page check if its the same logged in user or 
    const user = await User.findById(userId)

    console.log(user)
    console.log(monthAndYearFromDateObject(user.createdAt))
    //return that page
    return res.render("users/view-other-profile.ejs", { user, monthAndYearFromDateObject })
}

module.exports = {
    index,
    signUpPage,
    signInPage,
    signUp,
    signIn,
    signOut,
    loggedInUserProfilePage,
    updateLoggedInUserProfile,
    viewOtherProfilePage,
}
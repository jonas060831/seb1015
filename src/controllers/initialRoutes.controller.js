

const index = async (req, res) => {

    res.render("index.ejs", { user: { name: 'Jonas Sulit'} })
}

const signUp = async (req, res) => {
    res.render('auth/sign-up.ejs')
}

const signIn = async (req, res) => {
    res.render('auth.sign-in.ejs')
}



module.exports = {
    index,
    signUp,
    signIn
}
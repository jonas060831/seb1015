const models = require('../models')

const { User, Post } = models



const possibleContributors = [
    '/defaults/contributors/images/1.png',
    '/defaults/contributors/images/2.png',
    '/defaults/contributors/images/3.png',
    '/defaults/contributors/images/4.png',
    '/defaults/contributors/images/5.png',
    '/defaults/contributors/images/6.png',
    '/defaults/contributors/images/7.png',
    '/defaults/contributors/images/8.png',
    '/defaults/contributors/images/9.png',
    '/defaults/contributors/images/10.png',
]
const showContributorsSuggestionsPage = async(req, res) => {

    return res.render('contributors/suggestionsPage.ejs', { possibleContributors })
}


module.exports = {
    showContributorsSuggestionsPage
}
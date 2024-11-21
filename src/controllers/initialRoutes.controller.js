

const index = async (req, res) => {

    res.render("index.ejs", { user: { name: 'Jonas Sulit'} })
}

module.exports = {
    index
}
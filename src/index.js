const express = require('express')
const path = require("path")
//database connection
const connectToDatabase = require("./database")

const routes = require('./routes')
const app = express()

//routes
app.use('/', routes)

//we need to change ejs /views to /src/views
const ejsViewsFolder = 'views'
app.set('views', path.join(`${__dirname}/${ejsViewsFolder}`))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000;

async function startServer() {
    //2. lets start connecting the database
    await connectToDatabase();
    //1. start the server
    app.listen(PORT, () => {
        console.log(`Server Listening on Port: ${PORT}`)
    })
}

module.exports = startServer
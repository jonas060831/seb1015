const express = require('express')
const methodOverride = require("method-override")
const morgan = require("morgan")
const path = require("path")
const session = require('express-session')

//database connection
const connectToDatabase = require("./database")

const app = express()

const routes = require('./routes')


//we need to change ejs /views to /src/views
const ejsViewsFolder = 'views' //this should match the folder name for all ejs files and folder
app.set('views', path.join(`${__dirname}/${ejsViewsFolder}`))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))

//middlewares
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"))
// Morgan for logging HTTP requests
app.use(morgan('dev'))
//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//routes
app.use('/', routes)


//use public folder for some resources

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
const express = require('express')
const path = require("path")
//database connection
const connectToDatabase = require("./database")

const routes = require('./routes')
const app = express()



//we need to change ejs /views to /src/views
const ejsViewsFolder = 'views' //this should match the folder name for all ejs files and folder
app.set('views', path.join(`${__dirname}/${ejsViewsFolder}`))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))

//middlewares here



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
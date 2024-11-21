const express = require('express')

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000;

async function startServer() {

    app.listen(PORT, () => {
        console.log(`Server Listening on Port: ${PORT}`)
    })
}

module.exports = startServer
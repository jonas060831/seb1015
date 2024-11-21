const mongoose = require('mongoose')

async function connectToDatabase() {
    try {
        //connect
        mongoose.connect(process.env.MONGODB_URI)

        mongoose.connection.on("connected", () => {
            console.log(`Connected to MongoDB ${mongoose.connection.name}`)
        })
    } catch (error) {
        
        console.log(error)
    }
}

module.exports = connectToDatabase
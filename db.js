const mongoose = require('mongoose')

//  Defining mongodb connection url (usually defined in .env file)
const mongoURL = 'mongodb://localhost:27017/hotels'
// hotels -> name of the db (here we define the name of the DB which we want to connect)

// Setup MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;

// Defining event listeners for DB connection
db.on('connected', () => {
    console.log('Connected to MongoDB server')
})

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err)
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

module.exports = db;
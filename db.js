const mongoose = require('mongoose')
require('dotenv').config();

//  Defining mongodb connection url (usually defined in .env file)
const mongoURL = process.env.mongoURL

// Setup MongoDB connection
mongoose.connect(mongoURL)

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
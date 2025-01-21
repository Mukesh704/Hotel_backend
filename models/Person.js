const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Defining person's schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if the password is modified or new person's data is saved
    if(!person.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        // Hashed password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

// This method is used in the auth.js file for comparing the password
personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Using bcrypt to compare the provided password with the hashed password(stored)
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

// Creating person's model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
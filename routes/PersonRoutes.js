const express = require('express')
const router = express.Router()
const {jwtAuthMiddleware, generateToken} = require('../jwt.js')

const Person = require('../models/Person.js');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;  // This consists the data sent by user in body

        // Create a new person's document using the mongoose model
        const newPerson = new Person(data);

        const savedPerson = await newPerson.save();
        console.log('Data saved')

        const payload = {
            id: savedPerson.id,
            username: savedPerson.username
        }
        const token = generateToken(payload)

        res.status(200).json({
            response: savedPerson,
            token: token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

router.post('/login', async(req, res) => {
    try {
        // Extract username and password from the request body
        const {username, password} = req.body;

        // find user by the username
        const user = await Person.findOne({username: username});

        // if user or password dowsnot match return error
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                error: 'Invalid username or password'
            })
        }

        // generate token
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);
        res.json({token})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('Data fetched successfully')
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const work = await Person.find({
                work: workType
            })
            console.log(`Person's detail fetched`)
            res.status(200).json({
                success: true,
                data: work
            })
        }else {
            res.status(404).json({
                error: 'Invalid work type'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id
        const dataToUpdate = req.body

        const response = await Person.findByIdAndUpdate(personId, dataToUpdate, {
            new: true, // Return the updated document
            runValidators: true // Run mongoose validation
        })

        if(!response) {
            return res.status(404).json({
                success: false,
                error: 'Person not found'
            })
        }

        console.log('Data updated')
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: true,
            data: 'Internal server error'
        })
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const userId = req.params.id

        const response = await Person.findByIdAndDelete(userId)

        if(!response) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }

        console.log('Data deleted')
        res.status(200).json({
            success: true,
            message: 'Person deleted successfully'
        })
    } catch (err) {
        console.log(500)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})

module.exports = router;
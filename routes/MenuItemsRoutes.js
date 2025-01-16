const express = require('express')
const router = express.Router()

const MenuItem = require('../models/MenuItem.js');

router.get('/', async(req, res) => {
    try {
        const data = await MenuItem.find()
        console.log('Data fetched successfully')
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenuItem = new MenuItem(data);
        const savedMenuItem = await newMenuItem.save()
        console.log('menuItem data saved')
        res.status(200).json({
            success: true,
            data: savedMenuItem
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})

router.get('/:tasteType', async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour') {
            const taste = await MenuItem.find({
                taste: tasteType
            })
            console.log('Items according to taste type fetched')
            res.status(200).json({
                succesws: true,
                data: taste
            })
        }else {
            res.status(404).json({
                success: false,
                error: 'Invalid taste type'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
})

module.exports = router
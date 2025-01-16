const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PersonRoutes = require('./routes/PersonRoutes.js')
const MenuItemsRoutes = require('./routes/MenuItemsRoutes.js')

app.get('/', (req, res) => {
    res.send('Welcome to my hotel')
})

app.use('/person', PersonRoutes)
app.use('/menuItem', MenuItemsRoutes)


app.listen(3005, () => {
    console.log('Server listening on port 3005')
})
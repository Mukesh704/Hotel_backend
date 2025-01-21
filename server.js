const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth.js');

const PORT = process.env.PORT || 3005

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PersonRoutes = require('./routes/PersonRoutes.js')
const MenuItemsRoutes = require('./routes/MenuItemsRoutes.js')

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/', (req, res) => {
    res.send('Welcome to my hotel')
})

app.use('/person', PersonRoutes)
app.use('/menuItem', localAuthMiddleware, MenuItemsRoutes)

app.listen(PORT, () => {
    console.log('Server listening on port 3005')
})
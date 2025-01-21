const Person = require('./models/Person.js')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy( async (Username, Password, done) => {
    // Authentication logic
    try {
        const user = await Person.findOne({username: Username});
        if(!user) {
            return done(null, false, {message: 'Incorrect username'})
        }
        const isPasswordMatch = user.password === Password ? true : false;
        if(isPasswordMatch) {
            return done(null, user);
        }else {
            return done(null, false, {message: 'Incorrect Password'})
        }
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;
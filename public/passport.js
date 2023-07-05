const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// configuring the local strategy for passport
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne("username");

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})


//Describe user from session storage
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);

    } catch (error) {
        done(error);
    }
})

const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/users')


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', "Welcome to Guardian Coach Bus Booking and Reservation System")
            res.redirect('/routes')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/bookings'
    delete req.session.returnTo;
    console.log(redirectUrl)
    res.redirect(redirectUrl)
})


router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Goodbye')
        res.redirect('/bookings')
    })
})


module.exports = router;
const express = require('express');
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const ejs = require('ejs')
const ejsMate = require('ejs-mate')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const User = require('./models/users')

const Joi = require('joi');
const path = require('path')


app.use(express.static('public'))

//Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bus_proj_one')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

//Configuring EJS as the view engine and ejs-mate as the layour engine
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


// Configuring session and flash messages
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));
app.use(flash())

// Configuring passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Configuring body-parser and method-override
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Middleware to strore data in locals for easy access in templates
app.use((req, res, next) => {
    res.locals.selectedSeat = null
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next()
})



const busRoutes = require('./routes/buses')
const bookingRoutes = require('./routes/bookings')
const routeRoutes = require('./routes/routes')
const stationRoutes = require('./routes/stations')
const userRoutes = require('./routes/users')
const scheduleRoutes = require('./routes/schedules')

app.use('/', bookingRoutes)
app.use('/', userRoutes)
app.use('/routes', routeRoutes)
app.use('/stations', stationRoutes)
app.use('/schedules', scheduleRoutes)
app.use('/stations/:id/buses', busRoutes)




app.get('*', (req, res) => {
    res.send("Webpage not found")
})


app.listen(3000, () => {
    console.log('Server started on port 3000')
})
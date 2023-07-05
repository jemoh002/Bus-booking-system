const express = require('express')
const router = express.Router()
const Bus = require('../models/buses')
const Station = require('../models/station')
const { busSchema } = require('../schema')

async function findStation(id) {
    const station = await Station.findById(id)
    return station
}

router.get('/', async (req, res) => {

    const { id } = req.params
    const station = await Station.findById(id)
    const buses = await Bus.find()
    res.send("Hey stations")
    res.render('buses/show', { buses, station })


})



router.post('/', (req, res) => {
    const { busType, numberPlate, capacity } = req.body;


    const { error } = busSchema.validate({ busType, numberPlate, capacity })
    console.log(error)

    if (error) {
        console.log('There is an error in joi validation for bookingSchema')
        req.flash('error', 'Invalid booking data');
        res.redirect('/stations/:id/buses')
        return;
    }

    const bus = new Bus({ busType, numberPlate, capacity });

    bus.save()
        .then(() => {
            req.flash('bus', 'Bus details saved successfully')
            res.redirect('/stations/:id/buses')
        })
        .catch(err => {
            console.error("Error saving bus: ", err);
            req.flash('error', 'Error saving bus')
            res.redirect('/stations/:id/buses')
        });
})


router.get('/new', async (req, res) => {
    const { id } = req.params;
    const station = await findStation(id)
    res.render('buses/new', { station })
})

module.exports = router
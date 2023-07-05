const express = require('express')
const router = express.Router()
const Station = require('../models/station')
const Bus = require('../models/buses')
const { busSchema } = require('../schema')


async function findStation(id) {
    return await Station.findById(id)

}

router.get('/', async (req, res) => {
    const stations = await Station.find()
    console.log(stations)
    res.render('stations/show', { stations })
})

router.post('/', async (req, res) => {
    const { location } = req.body
    const saveStation = new Station({ location })
    await saveStation.save()
    res.redirect('/stations')

})

router.get('/new', (req, res) => {
    res.render('stations/new')
})

router.get('/:id/edit', async (req, res) => {

    const { id } = req.params
    const station = await Station.findById(id)
    res.render('stations/edit', { station })


})

router.put('/:id', async (req, res) => {

    const { id } = req.params

    const station = await Station.findByIdAndUpdate(id, req.body)
    res.redirect('/stations')

})

router.delete('/:id', async (req, res) => {

    const { id } = req.params

    await Station.findByIdAndDelete(id)
    res.redirect('/stations')

})

router.get('/:id/buses', async (req, res) => {

    const { id } = req.params
    const station = await Station.findById(id).populate('busId')
    res.render('buses/show', { station })


})

router.post('/:id/buses', async (req, res) => {
    const { id } = req.params
    const { busType, numberPlate, capacity } = req.body;


    const { error } = await busSchema.validate({ busType, numberPlate, capacity })
    console.log(error)

    if (error) {
        console.log('There is an error in joi validation for bookingSchema')
        req.flash('error', 'Invalid booking data');
        res.redirect('/stations/:id/buses')
        return;
    }


    const station = await Station.findById(id)
    const bus = new Bus({ busType, numberPlate, capacity });
    station.busId.push(bus)

    await bus.save()
    await station.save()

    res.redirect(`/stations/${station._id}/buses`)
    /*
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
        */
})


router.get('/:id/buses/new', async (req, res) => {
    const { id } = req.params;
    const station = await findStation(id)
    res.render('buses/new', { station })
})


router.get('/:id/buses/:busid/edit', async (req, res) => {
    const { id, busid } = req.params
    const station = await Station.findById(id).populate('busId')
    const bus = await Bus.findById(busid)
    res.render('buses/edit', { station, bus })
})

router.put('/:id/buses/:busid', async (req, res) => {
    const { id, busid } = req.params

    const bus = await Bus.findByIdAndUpdate(busid, req.body)
    req.flash('success', 'successfully update bus')
    res.redirect(`/stations/${id}/buses`)
})

router.delete('/:id/buses/:busid', async (req, res) => {
    const { id, busid } = req.params

    const bus = await Bus.findByIdAndDelete(busid)
    req.flash('success', 'successfully update bus')
    res.redirect(`/stations/${id}/buses`)
})


module.exports = router;
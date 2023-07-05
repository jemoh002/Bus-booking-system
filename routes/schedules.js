const express = require('express')
const router = express.Router()
const Station = require('../models/station')
const Route = require('../models/routes')
const Schedule = require('../models/schedules')
const Bus = require('../models/buses')

router.get('/:stationId', async (req, res) => {
    const { stationId } = req.params
    const station = await Station.findById(stationId)
    const schedules = await Schedule.find().populate('busID').populate('routeID')
    res.render('schedules/show', { station, schedules })
})

router.get('/:stationId/selectRoute', async (req, res) => {
    const { stationId } = req.params
    const station = await Station.findById(stationId)
    const routes = await Route.find({ startingPoint: station.location })
    res.render('schedules/selectRoute', { station, routes })

})

router.get('/:stationId/:routeId/new', async (req, res) => {
    const { stationId, routeId } = req.params
    const station = await Station.findById(stationId).populate('busId')
    const route = await Route.findById(routeId)
    res.render('schedules/new', { station, route })
})

router.post('/:stationId/:routeId', async (req, res) => {
    const { stationId, routeId } = req.params
    const { busId, departureDate } = req.body
    const station = await Station.findById(stationId)
    const route = await Route.findById(routeId)
    const bus = await Bus.findById(busId)
    //res.render('schedules/new', { station, route })
    if (station && route && bus) {
        const schedule = await new Schedule({ busID: bus._id, routeID: route._id, departure: route.startingPoint, destination: route.destination, departureDate })
        await schedule.save()
        await Bus.findByIdAndUpdate(bus._id, { isScheduled: true })
        res.redirect(`/schedules/${station._id}`)
    } else {
        req.flash('Error', 'Error in creating schedule, try again later')
        res.redirect(`/schedules/${station._id}`)
    }
})


router.get('/:stationId/:scheduleId', async (req, res) => {
    const { stationId, scheduleId } = req.params
    const station = await Station.findById(stationId)
    const schedule = await Schedule.findById(scheduleId).populate('busID')
    res.render('schedules/edit', { station, schedule })
})

router.delete('/:stationId/:scheduleId', async (req, res) => {
    const { stationId, scheduleId } = req.params
    const station = await Station.findById(stationId)
    const schedule = await Schedule.findById(scheduleId).populate('busID')
    await Bus.findByIdAndUpdate(schedule.busID, { isScheduled: false })
    await Schedule.findByIdAndDelete(scheduleId)
    res.redirect(`/schedules/${station._id}`)
})

module.exports = router
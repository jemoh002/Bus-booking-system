const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
    startingPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    estimated_travelTime: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Route', routeSchema)
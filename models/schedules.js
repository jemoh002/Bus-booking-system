const mongoose = require('mongoose')
const Schema = mongoose.Schema
const scheduleSchema = new Schema({
    busID: {
        type: Schema.Types.ObjectId,
        ref: 'Bus',
        required: true
    },
    routeID: {
        type: Schema.Types.ObjectId,
        ref: 'Route',
        required: true

    },
    departure: {
        type: String,
        required: true

    },
    destination: {
        type: String,
        required: true

    },
    departureDate: { type: Date, required: true }
    /*
    numberOfSeats: { type: String, required: true },
    seatsDetails: { type: String, required: true }, //Info of specific seats eg seat number
    paymentDetails: { type: String, required: true } //Info like amount, payment method and trans ID
    */
})

module.exports = mongoose.model('Schedule', scheduleSchema)

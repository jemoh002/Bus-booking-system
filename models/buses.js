const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const busSchema = new mongoose.Schema({
    stationId: { type: Schema.Types.ObjectId, ref: 'Station' },
    busType: { type: String, required: true },
    capacity: { type: Number, required: true },
    numberPlate: { type: String, required: true },
    isScheduled: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: false },
    seatsBooked: [],
    seatsSold: [],
    seatsAvailable: []
})

module.exports = mongoose.model('Bus', busSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Defining the schema for bus bookings
const bookingSchema = new mongoose.Schema({
    scheduleID: { type: Schema.Types.ObjectId, ref: 'Schedule' },
    firstName: String,
    lastName: String,
    phone: Number,
    amount: Number,
    bookedSeat: []
});

module.exports = mongoose.model('Booking', bookingSchema);

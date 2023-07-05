const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
    bookingID: { type: Schema.Types.ObjectId, ref: 'Booking' },
    method: { type: String, required: true },
    transactionID: { type: Number, required: true },
    transactionStatus: { type: String, required: true },
    transactionDesc: { type: String, required: true },
    date: { type: Date, required: true },
})

module.exports = mongoose.model('Payment', paymentSchema)
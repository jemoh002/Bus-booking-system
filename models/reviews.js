const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
    busID: { type: Schema.Types.ObjectId, ref: 'Bus' },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true }
})


module.exports = mongoose.model('Review', reviewSchema)
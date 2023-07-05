const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bus = require('../models/buses')

const stationSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    busId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bus'
        }
    ]

})

stationSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Bus.deleteMany({ _id: { $in: doc.busId } })
    }
})


module.exports = mongoose.model('Station', stationSchema)
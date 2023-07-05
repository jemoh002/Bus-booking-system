const mongoose = require('mongoose')
const Schema = mongoose.Schema

const edgeSchema = new Schema({
    startingPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Edge', edgeSchema)
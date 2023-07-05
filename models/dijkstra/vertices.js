const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vertexSchema = new Schema({
    location: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('Vertex', vertexSchema);
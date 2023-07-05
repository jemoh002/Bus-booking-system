const Joi = require('joi');


// Defining the schema for bus booking validation
module.exports.bookingSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.number().required(),
    selectedSeats: Joi.array().items(Joi.number()).min(1).required()
})

module.exports.busSchema = Joi.object({
    busType: Joi.string().required(),
    capacity: Joi.number().required(),
    numberPlate: Joi.string().required()
})
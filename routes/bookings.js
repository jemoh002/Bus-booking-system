const express = require('express')
const router = express.Router()
const axios = require('axios')
const unirest = require('unirest')
const Booking = require('../models/bookings')
const Bus = require('../models/buses')
const Schedule = require('../models/schedules')
const Payment = require('../models/payment')

const { bookingSchema } = require('../schema')




//Route to render the booking form
router.get('/', async (req, res) => {
    const schedules = await Schedule.find().populate('busID').populate('routeID')
    const departure = null
    const destination = null
    res.render('bookings/selectBus', { schedules, departure, destination })

});

router.get('/api/:id/getBookedSeats', async (req, res) => {
    const { id } = req.params
    const bus = await Bus.findById(id)
    res.json(bus.seatsBooked)
})

router.post('/queryBus', async (req, res) => {
    const { departure, destination } = req.body
    const schedules = await Schedule.find({ departure, destination }).populate('busID').populate('routeID')
    res.render('bookings/selectBus', { schedules, departure, destination })
})

router.get('/book/:bus_id', async (req, res) => {
    const { bus_id } = req.params
    const schedule = await Schedule.find({ busID: bus_id }).populate('busID').populate('routeID')

    res.render('bookings/booking-form', { schedule })


})


// Route to handle the submission of the booking form
router.post('/book/:bus_id', async (req, res) => {

    var { firstName, lastName, phone, selectedSeats, amount } = req.body;
    const bus_id = req.params.bus_id
    selectedSeats = JSON.parse(selectedSeats)
    const schedule = await Schedule.find({ busID: bus_id })



    // Validate the request data against the booking schema
    const { error } = bookingSchema.validate({ firstName, lastName, phone, selectedSeats });
    console.log(error)

    if (error) {
        console.log('There is an error in joi validation for bookingSchema')
        req.flash('error', 'Invalid booking data');
        res.redirect(`/book/${bus_id}`)
        return;
    }


    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        auth: {
            username: 'hQ9Ow6WJAoUH1VqJDYwGKTY7p49NniB7',
            password: 'ACJ4OIDALt6lkx7U'
        }
    });
    const accessToken = response.data.access_token

    await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNzAzMTE0NjQz",
        "Timestamp": "20230703114643",
        "TransactionType": "CustomerPayBillOnline",
        //"Amount": amount,
        "Amount": 1,
        "PartyA": phone,
        "PartyB": 174379,
        "PhoneNumber": phone,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => {
            const checkoutRequestID = response.data.CheckoutRequestID
            if (checkoutRequestID) {
                return checkoutRequestID
            } else {
                throw new Error("Checkout request ID not found")
            }

        })
        .then(checkoutRequestID => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(checkoutRequestID)
                }, 20000)
            })
        })
        .then(checkoutRequestID => {
            return axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query', {
                "BusinessShortCode": 174379,
                "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNzAzMTc0MTA5",
                "Timestamp": "20230703174109",
                "CheckoutRequestID": checkoutRequestID,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken} `
                }
            })

        })
        .then(async response => {
            const resultCode = parseInt(response.data.ResultCode);
            const resultDesc = response.data.ResultDesc;
            console.log(response.data)
            if (resultCode === 0) {
                const booking = new Booking({ scheduleID: schedule._id, bookedSeat: selectedSeats, firstName, lastName, amount, phone });
                await Bus.findByIdAndUpdate(
                    bus_id,
                    { $push: { bookedSeat: selectedSeats } },
                    { new: true }
                );

                booking.save()
                    .then(() => {
                        req.flash('success', 'Booking created successfully')
                        res.redirect('/')
                    })
                    .catch(err => {
                        console.error("Error saving booking: ", err);
                        req.flash('error', 'Error saving booking')
                        res.redirect('/')
                    });

                //const payment = new Payment()
                
                req.flash("Success", "Payment is successful")
            } else {
                throw new Error(resultDesc)
            }
        })
        .catch(err => {
            console.error(err);
            res.send("There is an error")
        });
});

// Route to display all bookings
router.get('/bookings', (req, res) => {
    /*
    Booking.find()
        .then(bookings => {



        });

    // convert the buses object to an array of values
    const busList = Object.values(buses);

    //rendering the bookingsview and passing the busList as a local variable
    res.render('bookings/bookings', { buses: busList });
})
    .catch(err => {
        console.error('Error fetching bookings:', err)
        req.flash('error', 'Error fetching bookings')
        res.redirect('/')
    });
    */

})


// Route to edit a booking
router.get('/bookings/:id/edit', (req, res) => {
    const { id } = req.params;

    Booking.findById(id)
        .then(booking => {
            res.render('bookings/booking-edit', { booking });
        })
        .catch(err => {
            console.error('Error fetching booking:', err);
            req.flash('error', 'Error fetching booking');
            res.redirect('/bookings');
        })
})


// Route to update a booking
router.put('/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { name, destination, date } = req.body;

    Booking.findByIdAndUpdate(id, { name, destination, date }, { new: true })
        .then(updateBooking => {
            req.flash('success', 'Booking updated successfully');
            res.redirect('/bookings');
        })
        .catch(err => {
            console.error('Error updating booking:', err);
            req.flash('error', 'Error updating booking')
            res.redirect('/bookings')
        })
})


//Route to delete a booking
router.delete('/bookings/:id', (req, res) => {
    const { id } = req.params;

    Booking.findByIdAndDelete(id)
        .then(() => {
            req.flash('success', 'Booking deleted successfully');
            res.redirect('/bookings');
        })
        .catch(err => {
            console.error('Error deleting booking:', err);
            req.flash('error', 'Error deleting booking');
            res.redirect('/bookings');
        });
})

module.exports = router

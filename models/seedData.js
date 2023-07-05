const mongoose = require('mongoose')
module.exports.seedData = [
    {
        busType: "AC",
        capacity: 40,
        numberPlate: "ABC123",
        seatsBooked: [10, 15, 20],
    },
    {
        busType: "Non-AC",
        capacity: 30,
        numberPlate: "XYZ789",
        seatsBooked: [5, 12, 25],
    },
    {
        busType: "Sleeper",
        capacity: 20,
        numberPlate: "PQR456",
        seatsBooked: [2, 8, 18],
    },
    {
        busType: "AC",
        capacity: 50,
        numberPlate: "DEF456",
        seatsBooked: [30, 32, 35],
    },
    {
        busType: "Semi-Sleeper",
        capacity: 35,
        numberPlate: "MNO789",
        seatsBooked: [1, 9, 23],
    },
];
/*
// Assuming you have a Mongoose model for the 'bus' collection
const Bus = mongoose.model('Bus', busSchema);

// Insert the seed data into the 'bus' collection
Bus.create(seedData, function (err, buses) {
    if (err) {
        console.error(err);
    } else {
        console.log("Seed data created successfully:", buses);
    }
});
*/




module.exports.seedDataRoutes = [
    {
        startingPoint: "City A",
        destination: "City B",
        distance: 100,
        estimated_travelTime: 2,
        fare: 10,
    },
    {
        startingPoint: "City B",
        destination: "City C",
        distance: 150,
        estimated_travelTime: 3,
        fare: 15,
    },
    {
        startingPoint: "City C",
        destination: "City D",
        distance: 200,
        estimated_travelTime: 4,
        fare: 20,
    },
    {
        startingPoint: "City D",
        destination: "City E",
        distance: 120,
        estimated_travelTime: 2.5,
        fare: 12,
    },
    {
        startingPoint: "City E",
        destination: "City F",
        distance: 180,
        estimated_travelTime: 3.5,
        fare: 18,
    },
];

/*

// Assuming you have a Mongoose model for the 'route' collection
const Route = mongoose.model('Route', routeSchema);

// Insert the seed data into the 'route' collection
Route.create(seedData, function (err, routes) {
    if (err) {
        console.error(err);
    } else {
        console.log("Seed data created successfully:", routes);
    }
});
*/


module.exports.seedDataBooking = [
    {
        name: "John Doe",
        destination: "City A",
        date: new Date("2023-06-15"),
        bookedSeat: 15,
    },
    {
        name: "Jane Smith",
        destination: "City B",
        date: new Date("2023-06-20"),
        bookedSeat: 10,
    },
    {
        name: "Michael Johnson",
        destination: "City C",
        date: new Date("2023-06-18"),
        bookedSeat: 5,
    },
    {
        name: "Emily Brown",
        destination: "City D",
        date: new Date("2023-06-22"),
        bookedSeat: 8,
    },
    {
        name: "William Davis",
        destination: "City E",
        date: new Date("2023-06-17"),
        bookedSeat: 20,
    },
];

/*
// Assuming you have a Mongoose model for the 'booking' collection
const Booking = mongoose.model('Booking', bookingSchema);

// Insert the seed data into the 'booking' collection
Booking.create(seedData, function (err, bookings) {
    if (err) {
        console.error(err);
    } else {
        console.log("Seed data created successfully:", bookings);
    }
});
*/




module.exports.seedDataPayment = [
    {
        bookingID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78a"),
        amount: 50,
        method: "Credit Card",
        transactionID: 123456789,
        transactionStatus: "Success",
        date: new Date("2023-06-15"),
    },
    {
        bookingID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78b"),
        amount: 40,
        method: "Debit Card",
        transactionID: 987654321,
        transactionStatus: "Success",
        date: new Date("2023-06-20"),
    },
    {
        bookingID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78c"),
        amount: 30,
        method: "PayPal",
        transactionID: 456789123,
        transactionStatus: "Success",
        date: new Date("2023-06-18"),
    },
    {
        bookingID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78d"),
        amount: 25,
        method: "Credit Card",
        transactionID: 789123456,
        transactionStatus: "Success",
        date: new Date("2023-06-22"),
    },
    {
        bookingID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78e"),
        amount: 35,
        method: "Debit Card",
        transactionID: 321654987,
        transactionStatus: "Success",
        date: new Date("2023-06-17"),
    },
];

/*
// Assuming you have a Mongoose model for the 'payment' collection
const Payment = mongoose.model('Payment', paymentSchema);

// Insert the seed data into the 'payment' collection
Payment.create(seedData, function (err, payments) {
    if (err) {
        console.error(err);
    } else {
        console.log("Seed data created successfully:", payments);
    }
});
*/



module.exports.seedDataSchedules = [
    {
        busID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de78f"),
        routeID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de790"),
        dateOfBooking: new Date("2023-06-15"),
        numberOfSeats: 2,
        seatsDetails: "Seat 10, Seat 15",
        paymentDetails: "Amount: $20, Method: Credit Card, Transaction ID: 123456789",
    },
    {
        busID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de791"),
        routeID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de792"),
        dateOfBooking: new Date("2023-06-20"),
        numberOfSeats: 3,
        seatsDetails: "Seat 5, Seat 8, Seat 12",
        paymentDetails: "Amount: $30, Method: Debit Card, Transaction ID: 987654321",
    },
    {
        busID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de793"),
        routeID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de794"),
        dateOfBooking: new Date("2023-06-18"),
        numberOfSeats: 1,
        seatsDetails: "Seat 3",
        paymentDetails: "Amount: $10, Method: PayPal, Transaction ID: 456789123",
    },
    {
        busID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de795"),
        routeID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de796"),
        dateOfBooking: new Date("2023-06-22"),
        numberOfSeats: 2,
        seatsDetails: "Seat 20, Seat 25",
        paymentDetails: "Amount: $15, Method: Credit Card, Transaction ID: 789123456",
    },
    {
        busID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de797"),
        routeID: new mongoose.Types.ObjectId("6178bdc91e3a4f001f7de798"),
        dateOfBooking: new Date("2023-06-17"),
        numberOfSeats: 4,
        seatsDetails: "Seat 1, Seat 4, Seat 7, Seat 9",
        paymentDetails: "Amount: $40, Method: Debit Card, Transaction ID: 321654987",
    },
];


/*
// Assuming you have a Mongoose model for the 'schedule' collection
const Schedule = mongoose.model('Schedule', scheduleSchema);

// Insert the seed data into the 'schedule' collection
Schedule.create(seedData, function (err, schedules) {
    if (err) {
        console.error(err);
    } else {
        console.log("Seed data created successfully:", schedules);
    }
});
*/








/*
const findMyState = () => {
    const status = document.querySelector('.status');

    const success = (position) => {
        console.log(position)
    }

    const error = () => {
        status.textContent = 'Unable to retrieve your location';
    }

    navigator.geolocation.getCurrentPosition(success, error)
}

document.querySelector('.find-state').addEventListener('click', findMyState)
*/

window.addEventListener('DOMContentLoaded', async function () {
    var selectedSeats = [];
    const fare = parseInt(document.getElementById("fare").textContent)


    function toggleSeatSelection(seat) {
        var seatValue = parseInt(seat.textContent);

        // checking if the seat is already selected
        var seatIndex = selectedSeats.indexOf(seatValue);
        if (seatIndex > -1) {
            // we remove the seat if it is in the array
            selectedSeats.splice(seatIndex, 1);
            seat.classList.remove('btn-selected');
        } else {
            // if the seat is unselected, it is added to the array
            selectedSeats.push(seatValue);
            seat.classList.add('btn-selected')
        }
        console.log(selectedSeats);
    }

    const busIdInput = document.querySelector('#noDisplay')
    const busId = busIdInput.value

    const tableDisplay = document.querySelector('.noDisplay')


    function toggleTableRow(seat, fare) {
        var table = document.getElementById("myTable");
        var body = document.getElementById("tableBody");
        var totalFareCell = document.getElementById("totalFare")
        var rows = body.getElementsByTagName("tr")
        var isSeatFound = false;

        //checking if the seat is in the table
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i]
            var seatCell = row.cells[0];

            if (parseInt(seatCell.innerHTML) === seat) {
                body.removeChild(row);
                isSeatFound = true;
                break;
            }

        }

        // a new row is added if seat is not found
        if (!isSeatFound) {
            var newRow = body.insertRow();

            var seatCell = newRow.insertCell(0);
            seatCell.innerHTML = seat

            var fareCell = newRow.insertCell(1);
            fareCell.innerHTML = fare;
        }

        //updating total fare
        var totalFare = 0
        for (var j = 0; j < rows.length; j++) {
            var row = rows[j]
            var fareCell = row.cells[1]
            totalFare += parseInt(fareCell.innerHTML)
        }
        totalFareCell.innerHTML = totalFare


    }

    function fetchBookedSeats(busId) {
        fetch(`/api/${busId}/getBookedSeats`)
            .then(response => response.json())
            .then(bookedSeats => {
                // Get all seats
                var seats = document.querySelectorAll('.seat')

                // click event
                seats.forEach(function (seat) {
                    const seatValue = parseInt(seat.textContent);

                    // checking if the seat is booked
                    if (bookedSeats.includes(seatValue)) {
                        seat.classList.add('btn-booked');
                        seat.disabled = true
                    }

                    seat.addEventListener('click', function () {

                        toggleSeatSelection(seat);
                        toggleTableRow(seatValue, fare)

                        if (selectedSeats.length !== 0) {
                            tableDisplay.classList.remove('noDisplay')

                        } else {
                            tableDisplay.classList.add('noDisplay')

                        }
                    })
                })
            })
            .catch(err => {
                console.error("Error fetching seats booked: ", error)
            })
    }

    fetchBookedSeats(busId)

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target

        const selectedSeatsInput = form.querySelector('#selectedSeatsInput')
        selectedSeatsInput.value = JSON.stringify(selectedSeats);

        // collecting the amount
        var totalFare = document.querySelector("#totalFare")
        const amount = form.querySelector('#amount')
        amount.value = parseInt(totalFare.textContent)

        // submitting the form
        form.submit()
    }

    // Now dealing with the form
    const bookingForm = document.querySelector('#booking-form');
    bookingForm.addEventListener('submit', handleSubmit);

})
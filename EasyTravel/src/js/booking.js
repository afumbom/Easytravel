document.addEventListener('DOMContentLoaded', function() {
    // Initialize date input with min date as today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Set max date to 30 days from today
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Initialize seat selection
    initializeSeatMap();

    const languageSelect = document.getElementById('language-select');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-fr]');
    const seatChart = document.getElementById('seat-chart');
    const busTypeSelect = document.getElementById('bus-type');
    const reservationButton = document.querySelector('button[type="submit"]');

    // Initialize an array to keep track of selected seats
    const selectedSeats = [];

    function translatePage(language) {
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-${language}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    function getNumberOfSeats(busType) {
        switch (busType) {
            case '30-seater':
                return 30;
            case '55-seater':
                return 55;
            case '70-seater':
                return 70;
            default:
                return 0; // In case of an unknown type
        }
    }

    function updateSeatChart() {
        const busType = busTypeSelect.value;
        const seatCount = getNumberOfSeats(busType);
        seatChart.innerHTML = '<div class="seat driver">D</div>'; // Driver seat

        const rows = Math.ceil(seatCount / 5); // Adjust the number of rows as needed

        for (let row = 0; row < rows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'seat-row';

            for (let i = 0; i < 5; i++) {
                const seatNumber = row * 5 + i + 1;
                if (seatNumber > seatCount) break;

                const seat = document.createElement('div');
                seat.className = 'seat free';
                seat.textContent = seatNumber < 10 ? `0${seatNumber}` : seatNumber; // Format seat numbers
                seat.dataset.seatNumber = seatNumber;

                // Event listener for seat selection
                seat.addEventListener('click', () => {
                    const seatIndex = selectedSeats.indexOf(seatNumber);
                    if (seat.classList.contains('free')) {
                        seat.classList.remove('free');
                        seat.classList.add('selected');
                        seat.style.backgroundColor = 'red'; // Change color to red
                        selectedSeats.push(seatNumber);
                    } else if (seat.classList.contains('selected')) {
                        seat.classList.remove('selected');
                        seat.classList.add('free');
                        seat.style.backgroundColor = ''; // Reset color
                        if (seatIndex > -1) {
                            selectedSeats.splice(seatIndex, 1);
                        }
                    }

                    console.log("Selected seats:", selectedSeats); // Log the current selected seats
                    // Optionally send selected seats to the backend
                    sendSelectedSeats();
                });

                rowDiv.appendChild(seat);
            }

            seatChart.appendChild(rowDiv);
        }
    }

    // Function to send selected seats to the backend
    function sendSelectedSeats() {
        fetch('http://localhost:3000/seats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seats: selectedSeats })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Seats updated:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    reservationButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Store selected seats in local storage
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));

        // Redirect to the payment page
        window.location.href = '/Users/macbookpro2017/Desktop/EasyTravel/Payment/payment.html';
    });

    // Initial setup
    busTypeSelect.addEventListener('change', updateSeatChart);
    languageSelect.addEventListener('change', () => {
        translatePage(languageSelect.value); // Update text on language change
    });

    updateSeatChart(); // Call once on load to display seats for default selection
    translatePage(languageSelect.value); // Initial translation
});

// Sample bus data
const buses = [
    {
        id: 1,
        company: 'Amour Mezam',
        departureTime: '08:00',
        arrivalTime: '14:00',
        price: 5000,
        type: 'VIP',
        availableSeats: 28
    },
    {
        id: 2,
        company: 'Garantie Express',
        departureTime: '09:30',
        arrivalTime: '15:30',
        price: 4500,
        type: 'Standard',
        availableSeats: 32
    },
    {
        id: 3,
        company: 'Vatican Express',
        departureTime: '11:00',
        arrivalTime: '17:00',
        price: 5500,
        type: 'Luxury',
        availableSeats: 24
    }
];

function showBuses() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;

    if (!from || !to || !date || !passengers) {
        alert('Please fill in all fields');
        return;
    }

    if (from === to) {
        alert('Departure and destination cities cannot be the same');
        return;
    }

    // Hide booking form and show bus selection
    document.querySelector('.booking-form').style.display = 'none';
    document.querySelector('.bus-selection').style.display = 'block';

    // Update step indicator
    document.querySelectorAll('.step')[0].classList.remove('active');
    document.querySelectorAll('.step')[0].classList.add('completed');
    document.querySelectorAll('.step')[1].classList.add('active');

    // Generate bus list
    const busList = document.querySelector('.bus-list');
    busList.innerHTML = buses.map(bus => `
        <div class="bus-card">
            <div class="bus-info">
                <h3>${bus.company}</h3>
                <div class="bus-details">
                    <span>Departure: ${bus.departureTime}</span>
                    <span>Arrival: ${bus.arrivalTime}</span>
                    <span>Type: ${bus.type}</span>
                    <span>Available Seats: ${bus.availableSeats}</span>
                </div>
            </div>
            <div class="bus-price">
                <span class="price">${bus.price} FCFA</span>
                <button class="btn btn-primary" onclick="selectBus(${bus.id})">Select Bus</button>
            </div>
        </div>
    `).join('');
}

function selectBus(busId) {
    // Hide bus selection and show seat layout
    document.querySelector('.bus-selection').style.display = 'none';
    document.querySelector('.bus-layout').style.display = 'block';

    // Update step indicator
    document.querySelectorAll('.step')[1].classList.remove('active');
    document.querySelectorAll('.step')[1].classList.add('completed');
    document.querySelectorAll('.step')[2].classList.add('active');

    // Initialize seat map for selected bus
    initializeSeatMap();
}

function initializeSeatMap() {
    const seatMap = document.querySelector('.seat-map');
    const totalSeats = 32; // 4x8 layout
    let seatHtml = '';

    for (let i = 1; i <= totalSeats; i++) {
        const isOccupied = Math.random() < 0.3; // 30% chance of being occupied
        seatHtml += `
            <div class="seat ${isOccupied ? 'occupied' : ''}" data-seat="${i}">
                <span class="seat-number">${i}</span>
            </div>
        `;
    }

    seatMap.innerHTML = seatHtml;

    // Add click event listeners to seats
    document.querySelectorAll('.seat:not(.occupied)').forEach(seat => {
        seat.addEventListener('click', () => toggleSeat(seat));
    });
}

function toggleSeat(seat) {
    seat.classList.toggle('selected');
    updateBookingSummary();
}

function updateBookingSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsText = selectedSeats.length > 0 
        ? Array.from(selectedSeats).map(seat => seat.dataset.seat).join(', ')
        : 'None';
    
    document.getElementById('selected-seats').textContent = selectedSeatsText;
    document.getElementById('total-amount').textContent = 
        `${selectedSeats.length * 5000} FCFA`;
}

function goBack() {
    const steps = document.querySelectorAll('.step');
    const currentStep = Array.from(steps).findIndex(step => step.classList.contains('active'));

    if (currentStep === 1) {
        document.querySelector('.bus-selection').style.display = 'none';
        document.querySelector('.booking-form').style.display = 'block';
        steps[0].classList.add('active');
        steps[0].classList.remove('completed');
        steps[1].classList.remove('active');
    } else if (currentStep === 2) {
        document.querySelector('.bus-layout').style.display = 'none';
        document.querySelector('.bus-selection').style.display = 'block';
        steps[1].classList.add('active');
        steps[1].classList.remove('completed');
        steps[2].classList.remove('active');
    }
}

function proceedToPayment() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }

    const totalAmount = selectedSeats.length * 5000;
    const seats = Array.from(selectedSeats).map(seat => seat.dataset.seat);
    
    // Store booking details in session storage
    sessionStorage.setItem('bookingDetails', JSON.stringify({
        seats: seats,
        totalAmount: totalAmount,
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        date: document.getElementById('date').value
    }));

    // Redirect to payment page
    window.location.href = '../Payment/payment.html';
}

// Load booking info from session storage
const bookingInfo = JSON.parse(sessionStorage.getItem('bookingInfo'));
if (!bookingInfo) {
    window.location.href = 'index.html';
}

// Update bus info
document.querySelector('.bus-name').textContent = bookingInfo.busName;
document.querySelector('.bus-route').textContent = 
    `${bookingInfo.departure.charAt(0).toUpperCase() + bookingInfo.departure.slice(1)} to 
     ${bookingInfo.destination.charAt(0).toUpperCase() + bookingInfo.destination.slice(1)} • 
     ${bookingInfo.date}`;

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const busType = params.get('type');
const route = params.get('route');
const date = params.get('date');
const windowPrice = parseInt(params.get('window'));
const aislePrice = parseInt(params.get('aisle'));
const frontPrice = parseInt(params.get('front'));

// Update summary
const summaryBusElem = document.getElementById('summaryBus');
const summaryRouteElem = document.getElementById('summaryRoute');
const summaryDateElem = document.getElementById('summaryDate');

summaryBusElem.textContent = bookingInfo.busName;
summaryRouteElem.textContent = route;
summaryDateElem.textContent = date;

// Generate seats
const seatsContainer = document.getElementById('seatsContainer');
const totalSeats = 32; // 8 rows x 4 seats
const occupiedSeats = ['A1', 'B3', 'C2', 'D4']; // Example occupied seats
const selectedSeats = new Set();

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 4; col++) {
        const seatNumber = String.fromCharCode(65 + row) + (col + 1);
        const isWindow = col === 0 || col === 3;
        const isFront = row < 2;
        const price = isFront ? frontPrice : (isWindow ? windowPrice : aislePrice);
        const type = isFront ? 'Front' : (isWindow ? 'Window' : 'Aisle');
        
        const seat = document.createElement('div');
        seat.className = `seat${occupiedSeats.includes(seatNumber) ? ' occupied' : ''}`;
        seat.innerHTML = `
            <span class="seat-type">${type}</span>
            ${seatNumber}
        `;

        if (!occupiedSeats.includes(seatNumber)) {
            seat.addEventListener('click', () => toggleSeat(seat, seatNumber, price, type));
        }

        seatsContainer.appendChild(seat);
    }
}

function toggleSeat(seatElement, seatNumber, price, type) {
    const isSelected = seatElement.classList.toggle('selected');
    
    if (isSelected) {
        selectedSeats.add({ number: seatNumber, price, type });
    } else {
        selectedSeats.delete([...selectedSeats].find(seat => seat.number === seatNumber));
    }
    
    updateSummary();
}

function updateSummary() {
    const selectedSeatsArray = [...selectedSeats];
    const totalAmount = selectedSeatsArray.reduce((sum, seat) => sum + seat.price, 0);
    const seatsList = selectedSeatsArray.map(seat => `${seat.number} (${seat.type})`).join(', ');

    document.getElementById('summarySeats').textContent = seatsList || '-';
    document.getElementById('summaryAmount').textContent = `${totalAmount.toLocaleString()} FCFA`;
    
    const proceedButton = document.getElementById('proceedPayment');
    proceedButton.disabled = selectedSeatsArray.length === 0;

    // Update proceed button to link to payment page when seats are selected
    if (selectedSeatsArray.length > 0) {
        proceedButton.onclick = () => {
            const paymentUrl = `../Payment/payment.html?bus=${encodeURIComponent(bookingInfo.busName)}&type=${encodeURIComponent(busType)}&route=${encodeURIComponent(route)}&seats=${encodeURIComponent(seatsList)}&amount=${totalAmount}&date=${encodeURIComponent(date)}`;
            window.location.href = paymentUrl;
        };
    }
}

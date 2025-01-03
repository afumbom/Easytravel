// Booking page functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeBookingPage();
});

function initializeBookingPage() {
    const steps = document.querySelectorAll('.step');
    const seatMap = document.querySelector('.seat-map');
    const summarySection = document.querySelector('.summary-section');
    const selectedSeats = new Set();
    const seatPrice = 5000; // Price per seat in CFA

    // Initialize seat selection
    if (seatMap) {
        createSeatMap();
        setupSeatSelection();
    }

    // Update booking steps
    function updateSteps(currentStep) {
        steps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('completed', 'active');
            }
        });
    }

    // Create seat map
    function createSeatMap() {
        const totalSeats = 40;
        const occupiedSeats = [3, 7, 12, 16, 22, 25]; // Example occupied seats

        for (let i = 1; i <= totalSeats; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.seatNumber = i;
            seat.textContent = i;

            if (occupiedSeats.includes(i)) {
                seat.classList.add('occupied');
            }

            seatMap.appendChild(seat);
        }
    }

    // Setup seat selection handlers
    function setupSeatSelection() {
        seatMap.addEventListener('click', (e) => {
            const seat = e.target.closest('.seat');
            if (!seat || seat.classList.contains('occupied')) return;

            seat.classList.toggle('selected');
            const seatNumber = parseInt(seat.dataset.seatNumber);

            if (seat.classList.contains('selected')) {
                selectedSeats.add(seatNumber);
            } else {
                selectedSeats.delete(seatNumber);
            }

            updateSummary();
        });
    }

    // Update booking summary
    function updateSummary() {
        const totalAmount = selectedSeats.size * seatPrice;
        summarySection.innerHTML = `
            <h3>Booking Summary</h3>
            <div class="summary-row">
                <span>Selected Seats:</span>
                <span>${Array.from(selectedSeats).join(', ')}</span>
            </div>
            <div class="summary-row">
                <span>Number of Seats:</span>
                <span>${selectedSeats.size}</span>
            </div>
            <div class="summary-row">
                <span>Price per Seat:</span>
                <span>${seatPrice.toLocaleString()} CFA</span>
            </div>
            <div class="summary-row">
                <span>Total Amount:</span>
                <span class="total-amount">${totalAmount.toLocaleString()} CFA</span>
            </div>
            ${selectedSeats.size > 0 ? `
                <button class="btn btn-primary" onclick="proceedToPayment()">
                    Proceed to Payment
                </button>
            ` : ''}
        `;
    }

    // Initialize summary
    updateSummary();
}

// Function to handle proceeding to payment
function proceedToPayment() {
    // Save booking details to session storage
    const bookingDetails = {
        selectedSeats: Array.from(selectedSeats),
        totalAmount: selectedSeats.size * seatPrice,
        bookingDate: new Date().toISOString()
    };
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    
    // Redirect to payment page
    window.location.href = '/payment';
}

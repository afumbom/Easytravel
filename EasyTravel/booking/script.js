document.addEventListener('DOMContentLoaded', () => {
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

document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');

    function updateLanguage(language) {
        const elements = document.querySelectorAll('[data-en], [data-fr]');
        elements.forEach(element => {
            const data = element.getAttribute(`data-${language}`);
            if (data !== null) {
                element.textContent = data;
            }
        });
    }

    function generateSeatMap(busNumber) {
        const container = document.querySelector(`.seat-map-container[data-bus-number="${busNumber}"]`);
        if (!container) return; // Skip if container is not found

        container.innerHTML = ''; // Clear previous content

        let rows, seatsPerRow, totalSeats;

        // Define seats based on bus size
        if (busNumber <= 3) { // Assuming buses 1-3 are 30-seaters
            rows = 8; // Increased rows for 30-seater buses
            seatsPerRow = 4;
            totalSeats = 30;
        } else if (busNumber <= 6) { // Assuming buses 4-6 are 55-seaters
            rows = 14;
            seatsPerRow = 4;
            totalSeats = 55;
        } else { // Assuming buses 7-10 are 70-seaters
            rows = 18;
            seatsPerRow = 4;
            totalSeats = 70;
        }

        let seatNumber = 1;

        for (let row = 0; row < rows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seat-row');
            rowDiv.style.display = 'flex'; // Make rows flexible

            for (let seat = 0; seat < seatsPerRow; seat++) {
                const seatDiv = document.createElement('div');
                seatDiv.classList.add('seat');
                
                // Determine seat type
                if (row === 0 && seat === 0) {
                    seatDiv.classList.add('driver-seat');
                    seatDiv.textContent = 'Driver';
                } else if (seatNumber <= totalSeats) {
                    // Mark seat as available or taken
                    if (seatNumber % 5 === 0) {
                        seatDiv.classList.add('taken');
                        seatDiv.textContent = seatNumber;
                    } else {
                        seatDiv.classList.add('available');
                        seatDiv.textContent = seatNumber;
                    }
                    seatNumber++;
                } else {
                    seatDiv.classList.add('disabled');
                    seatDiv.textContent = '';
                }

                rowDiv.appendChild(seatDiv);
            }
            container.appendChild(rowDiv);
        }
    }

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    updateLanguage(languageSelect.value);

    // Generate seat maps for all buses
    for (let i = 1; i <= 10; i++) {
        generateSeatMap(i);
    }
});

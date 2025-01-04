document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');

    // Function to update text content based on selected language
    function updateLanguage(language) {
        const elements = document.querySelectorAll('[data-en], [data-fr]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${language}`);
            if (text !== null) {
                element.textContent = text;
            }
        });
    }

    // Function to generate the seat map for a specific bus
    function generateSeatMap(busNumber) {
        const container = document.querySelector(`.seat-map-container[data-bus-number="${busNumber}"]`);
        if (!container) return; // Skip if no container is found

        container.innerHTML = ''; // Clear previous content

        let rows, seatsPerRow, totalSeats;

        // Define seat configuration based on bus size
        if (busNumber <= 3) { // 30-seaters
            rows = 8; 
            seatsPerRow = 4;
            totalSeats = 30;
        } else if (busNumber <= 6) { // 55-seaters
            rows = 14;
            seatsPerRow = 4;
            totalSeats = 55;
        } else { // 70-seaters
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

                // Add driver seat or numbered seats
                if (row === 0 && seat === 0) {
                    seatDiv.classList.add('driver-seat');
                    seatDiv.textContent = 'Driver';
                } else if (seatNumber <= totalSeats) {
                    seatDiv.textContent = seatNumber;
                    if (seatNumber % 5 === 0) {
                        seatDiv.classList.add('taken');
                    } else {
                        seatDiv.classList.add('available');
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

    // Event listener for language selection
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    // Set the initial language based on the default dropdown value
    updateLanguage(languageSelect.value);

    // Generate seat maps for all buses (1 through 10)
    for (let i = 1; i <= 10; i++) {
        generateSeatMap(i);
    }
});

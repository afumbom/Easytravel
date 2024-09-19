document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-fr]');
    const seatChart = document.getElementById('seat-chart');
    const busTypeSelect = document.getElementById('bus-type');

    function translatePage(language) {
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-${language}`);
            if (text) {
                el.textContent = text;
            }
        });
    }

    function updateSeatChart() {
        const busType = busTypeSelect.value;
        let seatCount;

        switch (busType) {
            case '30-seater':
                seatCount = 30;
                seatChart.dataset.seats = '30';
                seatChart.style.gridTemplateColumns = 'repeat(5, 1fr)';
                break;
            case '55-seater':
                seatCount = 55;
                seatChart.dataset.seats = '55';
                seatChart.style.gridTemplateColumns = 'repeat(7, 1fr)';
                break;
            case '70-seater':
                seatCount = 70;
                seatChart.dataset.seats = '70';
                seatChart.style.gridTemplateColumns = 'repeat(7, 1fr)';
                break;
        }

        // Clear existing seats
        seatChart.innerHTML = '<div class="seat driver">D</div>';

        for (let i = 1; i < seatCount; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat free';
            seat.textContent = i;
            seat.dataset.seatNumber = i;
            seat.addEventListener('click', () => {
                if (seat.classList.contains('free')) {
                    seat.classList.remove('free');
                    seat.classList.add('selected');
                } else if (seat.classList.contains('selected')) {
                    seat.classList.remove('selected');
                    seat.classList.add('free');
                }
            });
            seatChart.appendChild(seat);
        }
    }

    // Event listeners
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        translatePage(selectedLanguage);
    });

    busTypeSelect.addEventListener('change', updateSeatChart);

    // Initialize
    updateSeatChart();
    translatePage(languageSelect.value);
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // City autocomplete
    const cities = [
        'Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Buea', 
        'Limbe', 'Kribi', 'Garoua', 'Maroua', 'Bertoua'
    ];

    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');

    if (fromInput && toInput) {
        setupAutocomplete(fromInput, cities);
        setupAutocomplete(toInput, cities);
    }

    // Date validation
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    // Search form validation
    const searchForm = document.querySelector('.search-form form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const from = fromInput.value;
            const to = toInput.value;
            const date = dateInput.value;

            if (!from || !to || !date) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            if (from === to) {
                showAlert('Departure and destination cities cannot be the same', 'error');
                return;
            }

            // Proceed with search
            window.location.href = `/booking?from=${from}&to=${to}&date=${date}`;
        });
    }
});

function setupAutocomplete(input, items) {
    let currentFocus;

    input.addEventListener('input', function(e) {
        let val = this.value;
        closeAllLists();
        
        if (!val) return false;
        currentFocus = -1;

        const list = document.createElement('div');
        list.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(list);

        items.forEach(item => {
            if (item.toLowerCase().includes(val.toLowerCase())) {
                const element = document.createElement('div');
                element.innerHTML = item.replace(new RegExp(val, 'gi'), 
                    match => `<strong>${match}</strong>`);
                
                element.addEventListener('click', function(e) {
                    input.value = this.textContent;
                    closeAllLists();
                });
                
                list.appendChild(element);
            }
        });
    });

    input.addEventListener('keydown', function(e) {
        let x = document.getElementsByClassName('autocomplete-items')[0];
        if (x) x = x.getElementsByTagName('div');
        
        if (e.keyCode === 40) { // Down
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) { // Up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (currentFocus > -1 && x) x[currentFocus].click();
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(x) {
        Array.from(x).forEach(item => {
            item.classList.remove('autocomplete-active');
        });
    }

    function closeAllLists(elmnt) {
        const x = document.getElementsByClassName('autocomplete-items');
        Array.from(x).forEach(item => {
            if (elmnt !== item && elmnt !== input) {
                item.parentNode.removeChild(item);
            }
        });
    }

    document.addEventListener('click', e => {
        closeAllLists(e.target);
    });
}

function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

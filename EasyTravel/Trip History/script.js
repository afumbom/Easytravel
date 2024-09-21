const translations = {
    en: {
        "page-title": "Trip History",
        "main-heading": "Trip History",
        "footer-text": "© 2024 EasyTravel. All rights reserved.",
        "home": "Home",
        "booking": "Booking",
        "profile": "Profile",
        "trip-history": "Trip History",
        "loyalty-program": "Loyalty Program",
        "contact-us": "Contact Us"
    },
    fr: {
        "page-title": "Historique des Voyages",
        "main-heading": "Historique des Voyages",
        "footer-text": "© 2024 EasyTravel. Tous droits réservés.",
        "home": "Accueil",
        "booking": "Réservation",
        "profile": "Profil",
        "trip-history": "Historique des Voyages",
        "loyalty-program": "Programme de Fidélité",
        "contact-us": "Contactez-Nous"
    }
};

function applyTranslations(language) {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
        const key = element.id;
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        const key = link.href.split('/').pop().split('.')[0]; // Extracts file name from href
        if (translations[language] && translations[language][key]) {
            link.textContent = translations[language][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations('en'); // Default to English

    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        applyTranslations(selectedLanguage);
    });

    const tripList = document.getElementById('trip-list');
    // Sample trip data
    const trips = [
        { date: '2024-09-01', from: 'Douala', to: 'Yaoundé', status: 'Completed' },
        { date: '2024-09-15', from: 'Yaoundé', to: 'Buea', status: 'Completed' },
        { date: '2024-10-01', from: 'Buea', to: 'Douala', status: 'Upcoming' }
    ];

    trips.forEach(trip => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p><strong>Date:</strong> ${trip.date}</p>
            <p><strong>From:</strong> ${trip.from} <strong>To:</strong> ${trip.to}</p>
            <p>Status: <span class="status ${trip.status.toLowerCase()}">${trip.status}</span></p>
        `;

        // Add a slight fade-in animation
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(10px)';
        tripList.appendChild(listItem);
        setTimeout(() => {
            listItem.style.opacity = '1';
            listItem.style.transform = 'translateY(0)';
            listItem.style.transition = 'all 0.5s ease';
        }, 100);
    });
});

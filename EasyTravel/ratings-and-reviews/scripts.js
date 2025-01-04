const translations = {
    en: {
        "page-title": "Rate Your Trip Experience",
        "rating-label": "Your Rating:",
        "review-label": "Write a Review:",
        "username-label": "Your Name:",
        "submit-button": "Submit Review",
        "reviews-heading": "Previous Reviews",
        "selected-rating": "Please select a rating",
        "nav-home": "Home",
        "nav-booking": "Booking",
        "nav-profile": "Profile",
        "nav-trip-history": "Trip History",
        "nav-loyalty": "Loyalty Program",
        "nav-contact": "Contact Us"
    },
    fr: {
        "page-title": "Évaluez Votre Expérience de Voyage",
        "rating-label": "Votre Évaluation:",
        "review-label": "Écrire un Avis:",
        "username-label": "Votre Nom:",
        "submit-button": "Soumettre l'Avis",
        "reviews-heading": "Avis Précédents",
        "selected-rating": "Veuillez sélectionner une évaluation",
        "nav-home": "Accueil",
        "nav-booking": "Réservation",
        "nav-profile": "Profil",
        "nav-trip-history": "Historique des voyages",
        "nav-loyalty": "Programme de fidélité",
        "nav-contact": "Nous contacter"
    }
    // Add more languages here
};

function applyTranslations(language) {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
        const key = element.id;
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const key = link.id;
        if (translations[language] && translations[language][key]) {
            link.textContent = translations[language][key];
        }
    });
}

document.getElementById('language-select').addEventListener('change', function(e) {
    applyTranslations(e.target.value);
});

// Apply default language on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations('en'); // Default to English
});

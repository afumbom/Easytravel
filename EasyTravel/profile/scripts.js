// Sample translations
const translations = {
    en: {
        "menu-home": "Home",
        "menu-booking": "Booking",
        "menu-profile": "Profile",
        "menu-trip-history": "Trip History",
        "menu-loyalty-program": "Loyalty Program",
        "menu-contact": "Contact Us",
        "page-title": "Your Profile",
        "label-first-name": "First Name:",
        "label-last-name": "Last Name:",
        "label-email": "Email:",
        "label-phone": "Phone Number:",
        "label-password": "Password:",
        "label-confirm-password": "Confirm Password:",
        "btn-update-profile": "Update Profile",
        "footer-text": "&copy; 2024 EasyTravel. All rights reserved.",
        "password-weak": "Password is weak. It must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character."
    },
    fr: {
        "menu-home": "Accueil",
        "menu-booking": "Réservation",
        "menu-profile": "Profil",
        "menu-trip-history": "Historique des Voyages",
        "menu-loyalty-program": "Programme de Fidélité",
        "menu-contact": "Contactez-nous",
        "page-title": "Votre Profil",
        "label-first-name": "Prénom:",
        "label-last-name": "Nom de Famille:",
        "label-email": "Email:",
        "label-phone": "Numéro de Téléphone:",
        "label-password": "Mot de Passe:",
        "label-confirm-password": "Confirmer le Mot de Passe:",
        "btn-update-profile": "Mettre à Jour le Profil",
        "footer-text": "&copy; 2024 EasyTravel. Tous droits réservés.",
        "password-weak": "Le mot de passe est faible. Il doit comporter au moins 6 caractères, une lettre majuscule, un chiffre et un caractère spécial."
    }
};

// Function to apply translations
function applyTranslations(language) {
    const elements = document.querySelectorAll('[id]');
    elements.forEach(element => {
        const key = element.id;
        if (translations[language][key]) {
            if (element.tagName === 'P' || element.tagName === 'LABEL') {
                element.innerHTML = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
}

// Handle form submission
const profileForm = document.getElementById('profile-form');
const confirmationMessage = document.getElementById('confirmation-message');

profileForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!validatePassword(password)) {
        confirmationMessage.textContent = translations[languageSelect.value]["password-weak"];
        confirmationMessage.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        confirmationMessage.textContent = 'Passwords do not match!';
        confirmationMessage.classList.remove('hidden');
        return;
    }

    // Simulate profile update and show confirmation message
    confirmationMessage.textContent = 'Your profile has been successfully updated!';
    confirmationMessage.classList.remove('hidden');
    confirmationMessage.style.opacity = 1;

    // Hide the confirmation message after 3 seconds
    setTimeout(() => {
        confirmationMessage.style.opacity = 0;
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
        }, 500);
    }, 3000);
});

// Password validation function
function validatePassword(password) {
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;
}

// Handle language selection
const languageSelect = document.getElementById('language-select');
languageSelect.addEventListener('change', function() {
    applyTranslations(this.value);
});

// Initialize with default language
applyTranslations('en');

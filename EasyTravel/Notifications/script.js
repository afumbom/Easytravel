// Sample notifications with translations
const translations = {
    en: {
        notifications: [
            { title: 'Booking Confirmation', message: 'Your booking for Bus 1234 has been confirmed.' },
            { title: 'Trip Reminder', message: 'Your trip from Douala to Yaounde departs in 1 hour.' },
            { title: 'Seat Upgrade', message: 'Congratulations! You have been upgraded to a VIP seat on Bus 5678.' },
            { title: 'Loyalty Points', message: 'You have earned 100 loyalty points for your last trip.' },
            { title: 'Cancellation Notice', message: 'Your trip on Bus 3456 has been canceled due to technical issues. Please rebook.' }
        ],
        menu: {
            home: 'Home',
            booking: 'Booking',
            profile: 'Profile',
            tripHistory: 'Trip History',
            loyaltyProgram: 'Loyalty Program',
            contact: 'Contact Us'
        }
    },
    fr: {
        notifications: [
            { title: 'Confirmation de Réservation', message: 'Votre réservation pour le Bus 1234 a été confirmée.' },
            { title: 'Rappel de Voyage', message: 'Votre voyage de Douala à Yaoundé part dans 1 heure.' },
            { title: 'Surclassement de Siège', message: 'Félicitations ! Vous avez été surclassé en siège VIP sur le Bus 5678.' },
            { title: 'Points de Fidélité', message: 'Vous avez gagné 100 points de fidélité pour votre dernier voyage.' },
            { title: 'Avis d\'Annulation', message: 'Votre voyage sur le Bus 3456 a été annulé en raison de problèmes techniques. Veuillez réserver à nouveau.' }
        ],
        menu: {
            home: 'Accueil',
            booking: 'Réservation',
            profile: 'Profil',
            tripHistory: 'Historique des Voyages',
            loyaltyProgram: 'Programme de Fidélité',
            contact: 'Contactez-nous'
        }
    }
};

// Function to load notifications
function loadNotifications(language = 'en') {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = ''; // Clear existing notifications
    
    translations[language].notifications.forEach((notification, index) => {
        const notificationItem = document.createElement('li');
        notificationItem.classList.add('notification-item');
        notificationItem.innerHTML = `
            <h3 class="notification-title">${notification.title}</h3>
            <p class="notification-message">${notification.message}</p>
        `;
        
        notificationList.appendChild(notificationItem);

        // Delay each notification's animation for better effect
        setTimeout(() => {
            notificationItem.style.animationDelay = `${index * 0.3}s`;
        }, 0);
    });
}

// Function to switch language
function switchLanguage(language) {
    loadNotifications(language);
    
    // Update static text elements
    document.querySelector('.page-title').textContent = language === 'en' ? 'Notifications' : 'Notifications (Français)';

    // Update menu text
    document.getElementById('menu-home').textContent = translations[language].menu.home;
    document.getElementById('menu-booking').textContent = translations[language].menu.booking;
    document.getElementById('menu-profile').textContent = translations[language].menu.profile;
    document.getElementById('menu-trip-history').textContent = translations[language].menu.tripHistory;
    document.getElementById('menu-loyalty-program').textContent = translations[language].menu.loyaltyProgram;
    document.getElementById('menu-contact').textContent = translations[language].menu.contact;
}

// Load notifications on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNotifications();
    
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        switchLanguage(e.target.value);
    });
});

// Main JS Code
document.addEventListener('DOMContentLoaded', function () {
    // Other initialization logic can be added here
    console.log("Page Loaded. Main JS is active.");
});

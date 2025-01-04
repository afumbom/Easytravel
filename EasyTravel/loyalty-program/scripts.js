document.getElementById('language-switcher').addEventListener('change', function() {
    const selectedLanguage = this.value;
    
    const translations = {
        en: {
            navHome: "Home",
            navBooking: "Booking",
            navProfile: "Profile",
            navTripHistory: "Trip History",
            navLoyalty: "Loyalty Program",
            navContact: "Contact Us",
            loyaltyTitle: "Loyalty Program",
            loyaltyDesc: "Join our loyalty program to earn points for every trip and enjoy exclusive offers and rewards! The more you travel, the more you earn!",
            whyJoin: "Why Join?",
            benefit1: "Free Trips: Collect points and redeem them for free trips!",
            benefit2: "Exclusive Discounts: Get access to members-only promotions.",
            benefit3: "Priority Booking: Be the first to secure your favorite seats.",
            joinNow: "Join Now"
        },
        fr: {
            navHome: "Accueil",
            navBooking: "Réservation",
            navProfile: "Profil",
            navTripHistory: "Historique des voyages",
            navLoyalty: "Programme de fidélité",
            navContact: "Nous contacter",
            loyaltyTitle: "Programme de fidélité",
            loyaltyDesc: "Rejoignez notre programme de fidélité pour gagner des points à chaque voyage et profiter d'offres exclusives et de récompenses ! Plus vous voyagez, plus vous gagnez !",
            whyJoin: "Pourquoi nous rejoindre ?",
            benefit1: "Voyages gratuits : Collectez des points et échangez-les contre des voyages gratuits !",
            benefit2: "Réductions exclusives : Accédez à des promotions réservées aux membres.",
            benefit3: "Réservation prioritaire : Soyez le premier à sécuriser vos sièges préférés.",
            joinNow: "Rejoignez maintenant"
        }
    };

    // Update the content of the page based on selected language
    document.getElementById('nav-home').textContent = translations[selectedLanguage].navHome;
    document.getElementById('nav-booking').textContent = translations[selectedLanguage].navBooking;
    document.getElementById('nav-profile').textContent = translations[selectedLanguage].navProfile;
    document.getElementById('nav-trip-history').textContent = translations[selectedLanguage].navTripHistory;
    document.getElementById('nav-loyalty').textContent = translations[selectedLanguage].navLoyalty;
    document.getElementById('nav-contact').textContent = translations[selectedLanguage].navContact;
    document.getElementById('loyalty-title').textContent = translations[selectedLanguage].loyaltyTitle;
    document.getElementById('loyalty-desc').textContent = translations[selectedLanguage].loyaltyDesc;
    document.getElementById('why-join').textContent = translations[selectedLanguage].whyJoin;
    document.getElementById('benefit-1').textContent = translations[selectedLanguage].benefit1;
    document.getElementById('benefit-2').textContent = translations[selectedLanguage].benefit2;
    document.getElementById('benefit-3').textContent = translations[selectedLanguage].benefit3;
    document.getElementById('join-loyalty').textContent = translations[selectedLanguage].joinNow;
});

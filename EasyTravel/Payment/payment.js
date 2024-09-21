document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const selectedSeatsDiv = document.getElementById('selected-seats');
    const totalPriceDiv = document.getElementById('total-price');
    const taxDiv = document.getElementById('tax');
    const finalPriceDiv = document.getElementById('final-price');
    const paymentMethodSelect = document.getElementById('payment-method');
    const mobileMoneyNumberDiv = document.getElementById('mobile-money-number');
    const mobileMoneyNumberInput = document.getElementById('number');
    const submitPaymentButton = document.getElementById('submit-payment');
    const notificationDiv = document.getElementById('notification');
    const unitPrice = 7000; // Unit price for each seat in XAF
    const taxAmount = 0; // Tax is set to zero for now

    // Retrieve selected seats from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    function translatePage(language) {
        const translations = {
            en: {
                selectedSeats: `Selected Seats: ${selectedSeats ? selectedSeats.join(', ') : 'No seats selected.'}`,
                totalPrice: `Total Price: ${calculateTotalPrice()} XAF`,
                tax: `Tax: ${taxAmount} XAF`,
                finalPrice: `Final Price (with Tax): ${calculateFinalPrice()} XAF`,
                paymentMethodLabel: 'Select Payment Method:',
                mobileMoneyLabel: 'Enter Mobile Money Number:',
                submitButton: 'Submit Payment',
                notificationSelect: 'Please select a payment method and enter your mobile number.',
                notificationTimeout: 'You have 120 seconds to complete your transaction.',
                paymentSuccess: `Payment successful! Please dial ${getDialCode()} to complete your payment.`,
                footer: '&copy; 2024 Easy Travel'
            },
            fr: {
                selectedSeats: `Sièges Sélectionnés: ${selectedSeats ? selectedSeats.join(', ') : 'Aucun siège sélectionné.'}`,
                totalPrice: `Prix Total: ${calculateTotalPrice()} XAF`,
                tax: `Taxe: ${taxAmount} XAF`,
                finalPrice: `Prix Final (avec Taxe): ${calculateFinalPrice()} XAF`,
                paymentMethodLabel: 'Sélectionnez le Mode de Paiement:',
                mobileMoneyLabel: 'Entrez le Numéro de Mobile Money:',
                submitButton: 'Soumettre le Paiement',
                notificationSelect: 'Veuillez sélectionner un mode de paiement et entrer votre numéro de mobile.',
                notificationTimeout: 'Vous avez 120 secondes pour compléter votre transaction.',
                paymentSuccess: `Paiement réussi ! Veuillez composer ${getDialCode()} pour finaliser votre paiement.`,
                footer: '&copy; 2024 Voyage Facile'
            }
        };

        const translation = translations[language];
        selectedSeatsDiv.textContent = translation.selectedSeats;
        totalPriceDiv.textContent = translation.totalPrice;
        taxDiv.textContent = translation.tax;
        finalPriceDiv.textContent = translation.finalPrice;
        submitPaymentButton.textContent = translation.submitButton;

        // Update footer text
        document.querySelector('footer').innerHTML = translation.footer;

        // Translate navigation links
        translateNavLinks(language);
        
        return translation; // Return the translation object
    }

    function translateNavLinks(language) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.textContent = link.getAttribute(`data-lang-${language}`);
        });
    }

    function calculateTotalPrice() {
        return selectedSeats ? selectedSeats.length * unitPrice : 0;
    }

    function calculateFinalPrice() {
        return calculateTotalPrice() + taxAmount;
    }

    function getDialCode() {
        return paymentMethodSelect.value === 'mtn' ? '*126#' : '#150#';
    }

    if (selectedSeats && selectedSeats.length > 0) {
        translatePage(languageSelect.value);
    } else {
        selectedSeatsDiv.textContent = 'No seats selected.';
        totalPriceDiv.textContent = '';
        taxDiv.textContent = '';
        finalPriceDiv.textContent = '';
    }

    // Show mobile money number input when payment method is selected
    paymentMethodSelect.addEventListener('change', (e) => {
        mobileMoneyNumberDiv.style.display = e.target.value ? 'block' : 'none';
    });

    // Handle payment submission
    submitPaymentButton.addEventListener('click', () => {
        const paymentMethod = paymentMethodSelect.value;
        const mobileNumber = mobileMoneyNumberInput.value;

        const translation = translatePage(languageSelect.value); // Get translations again

        if (!paymentMethod || !mobileNumber) {
            notificationDiv.textContent = translation.notificationSelect;
            notificationDiv.style.color = 'red';
            notificationDiv.style.display = 'block';
            return;
        }

        // Show message that the user has 120 seconds to complete the transaction
        notificationDiv.textContent = translation.notificationTimeout;
        notificationDiv.style.color = 'blue';
        notificationDiv.style.display = 'block';

        // Simulate payment processing and 120-second timeout
        setTimeout(() => {
            // Generate PDF receipt
            generatePDFReceipt(selectedSeats, calculateTotalPrice());

            // Save notification message to session storage to display on the Notifications page
            sessionStorage.setItem('notificationMessage', translation.paymentSuccess);

            // Redirect to the notifications page
            window.location.href = '/Users/macbookpro2017/Desktop/EasyTravel/Notifications/Notifications.html';
        }, 120000); // 120,000 milliseconds = 120 seconds
    });

    function generatePDFReceipt(selectedSeats, totalPrice) {
        const { jsPDF } = window.jspdf; // Make sure jsPDF is loaded
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("Payment Receipt", 10, 10);
        doc.setFontSize(12);
        doc.text(`Selected Seats: ${selectedSeats.join(', ')}`, 10, 30);
        doc.text(`Total Price: ${totalPrice} XAF`, 10, 40);
        doc.text(`Tax: ${taxAmount} XAF`, 10, 50);
        doc.text(`Final Amount: ${totalPrice + taxAmount} XAF`, 10, 60);
        doc.save("receipt.pdf");
    }

    // Language switch event listener
    languageSelect.addEventListener('change', () => {
        translatePage(languageSelect.value);
    });

    // Initial translation
    translatePage(languageSelect.value);
});

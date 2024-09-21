const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080; // You can change this to any port you prefer

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files from specific folders
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage', 'homepage.html')); // Adjust this path as needed
});

// Route for the booking page
app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'booking', 'Book a Bus.html'));
});

// Route for the bus details page
app.get('/bus-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'bus details', 'BusDetails.html'));
});

// Route for the profile page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile', 'profile.html'));
});

// Route for trip history page
app.get('/trip-history', (req, res) => {
    res.sendFile(path.join(__dirname, 'Trip History', 'triphistory.html'));
});

// Route for about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about', 'about.html'));
});

// Route for contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Add more routes as needed for other pages...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

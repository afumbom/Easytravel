const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
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

// Import routes
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const bookingRoutes = require('./routes/booking');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/booking', bookingRoutes);

// Add more routes as needed for other pages...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

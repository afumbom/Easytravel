const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    }
});

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    route: {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    seats: [seatSchema],
    busType: {
        type: String,
        enum: ['Standard', 'VIP', 'Luxury'],
        required: true
    },
    amenities: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Completed'],
        default: 'Active'
    }
});

module.exports = mongoose.model('Bus', busSchema);

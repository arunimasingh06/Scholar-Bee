const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    sponsorshipDetails: {
        amount: {
            type: Number,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        projectSupported: {
            type: String,
            required: true,
        },
    },
}, { timestamps: true });

const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports = Sponsor;
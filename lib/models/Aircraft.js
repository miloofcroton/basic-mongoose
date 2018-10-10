const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({

    name: {
        official: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true
        }
    },
    specs: {
        type: {
            type: [String],
            enum: ['fighter', 'bomber', 'helicopter', 'support'],
            required: true
        },
        armament: {
            type: [String],
            required: () => this.type !== 'support'
        },
        speed: {
            type: Number,
            min: 0
        }
    },
    history: {
        released: {
            type: Number,
            min: 1900
        },
        active: {
            type: Boolean,
            required: true
        }
    }

});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

module.exports = Aircraft;

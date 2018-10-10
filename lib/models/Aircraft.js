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
        },
        variants: {
            type: [String]
        }
    },
    specs: {
        type: {
            type: [String],
            enum: ['fighter', 'close air support', 'helicopter', 'support'],
            required: true
        },
        armament: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            required: function() {
                return !this.specs.type.includes('support');
            }
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

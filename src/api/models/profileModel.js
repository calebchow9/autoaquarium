var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tempLow: {
        type: Number,
        required: true,
    },
    tempHigh: {
        type: Number,
        required: true,
    },
    phLow: {
        type: Number,
        required: true
    },
    phHigh: {
        type: Number,
        required: true
    },
    condLow: {
        type: Number,
        required: true
    },
    condHigh: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);

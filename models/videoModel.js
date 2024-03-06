const mongoose = require('mongoose');

const video = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Video', video);
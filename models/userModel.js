const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    pin: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    country: String,
    birthdate: {
        required: true,
        type: Date
    },
    kids: [{ type: Schema.Types.ObjectId, ref: 'Kid' }]
})

module.exports = mongoose.model('User', user);
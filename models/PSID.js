const mongoose = require('mongoose')

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }

const PSIDSchema = new mongoose.Schema({
    token: {
        type: String,
        default: null
    },
    slot: Number,
    active: {
        type: Boolean,
        default: false
    }
}, opts)

module.exports = mongoose.model('Psid', PSIDSchema)
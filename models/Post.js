const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false,
        default: ""
    },
}, { timestamps: true })

module.exports = mongoose.model('posts', postSchema)
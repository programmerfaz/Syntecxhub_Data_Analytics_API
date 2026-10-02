const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    views: {
        type: Number,
        required: true,
        min: [0, 'Views must be at least 0'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

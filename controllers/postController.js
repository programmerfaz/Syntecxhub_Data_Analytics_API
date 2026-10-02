const mongoose = require('mongoose');
const Post = require('../models/postModel');

const createPost = async (req, res) => {
    const { title, category, author, views, date } = req.body;

    if (!title || !category || !author || views === undefined) {
        return res.status(400).json({ message: 'Title, category, author, and views are required' });
    }

    if (typeof views !== 'number' || views < 0) {
        return res.status(400).json({ message: 'Views must be a number of 0 or more' });
    }

    const post = await Post.create({
        title,
        category,
        author,
        views,
        date: date || Date.now(),
    });

    res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
    const filter = {};

    if (req.query.author) {
        filter.author = req.query.author;
    }

    if (req.query.category) {
        filter.category = req.query.category;
    }

    const posts = await Post.find(filter).sort({ date: -1 });
    res.status(200).json(posts);
};

const getPostById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
};

const updatePost = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
};

const deletePost = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };

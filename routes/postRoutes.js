const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

router.post('/', asyncHandler(createPost));
router.get('/', asyncHandler(getAllPosts));
router.get('/:id', asyncHandler(getPostById));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

module.exports = router;

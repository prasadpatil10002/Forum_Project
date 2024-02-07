const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPostId, updateComment, deleteComment } = require('../controllers/commentController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createComment);

router.get('/post/:postId', getCommentsByPostId);

router.put('/:commentId', authenticateToken, updateComment);

router.delete('/:commentId', authenticateToken, deleteComment);

module.exports = router;
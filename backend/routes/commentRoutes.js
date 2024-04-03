const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPostId, updateComment, deleteComment } = require('../controllers/commentController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createComment);

router.get('/post/:postid', getCommentsByPostId);

router.put('/:commentid', authenticateToken, updateComment);

router.delete('/:commentid', authenticateToken, deleteComment);

module.exports = router;
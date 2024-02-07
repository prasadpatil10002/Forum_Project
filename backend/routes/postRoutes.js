const express = require('express');
const router = express.Router();
const {createPost,updatePost,getAllPosts,getuserPosts,deletePost} = require('../controllers/postController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/createpost',authenticateToken,createPost);

router.put('/:postid',authenticateToken,updatePost);

router.delete('/:postid',authenticateToken,deletePost);

router.get('/userposts',authenticateToken,getuserPosts);

router.get('/all',authenticateToken,getAllPosts);

module.exports = router;

const { Comment } = require('../models');

// Controller function to create a new comment
async function createComment(req, res) {
  try {
    const { content, postId } = req.body;
    const userId = req.user.userId; // Assuming you have middleware to extract userId from token
    
    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json({ success: true, message: 'Comment created successfully', comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment' });
  }
}

// Controller function to update a comment
async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Update the comment content
    comment.content = content;
    await comment.save();

    res.json({ success: true, message: 'Comment updated successfully', comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, message: 'Error updating comment' });
  }
}

// Controller function to delete a comment
async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Delete the comment
    await comment.destroy();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Error deleting comment' });
  }
}

module.exports = { createComment, updateComment, deleteComment };
const { Comment } = require('../models');

// Controller function to create a new comment
async function createComment(req, res) {
  try {
    const { content, postId } = req.body;
    const userId = req.user.userId; // Assuming you have middleware to extract userId from token
    
    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json({ success: true, message: 'Comment created successfully', comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment' });
  }
}

// Controller function to update a comment
async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Update the comment content
    comment.content = content;
    await comment.save();

    res.json({ success: true, message: 'Comment updated successfully', comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ success: false, message: 'Error updating comment' });
  }
}

// Controller function to delete a comment
async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Delete the comment
    await comment.destroy();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Error deleting comment' });
  }
}

async function getCommentsByPostId(req, res) {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({ where: { postId } });
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments by postId:', error);
      res.status(500).json({ message: 'Error fetching comments by postId' });
    }
  }

module.exports = { createComment, updateComment, deleteComment,getCommentsByPostId};

const { Comment ,User} = require('../models');

// Controller function to create a new comment
async function createComment(req, res) {
  try {
    const { content, postid } = req.body;
    const userid = req.user.userid; // Assuming you have middleware to extract userId from token
    
    const comment1 = await Comment.create({ content, postid, userid });
    const user = await User.findByPk(userid);
    const username = user.username;

    const comment = {
      ...comment1.toJSON(),
      user:{username: username}
      
    };
    res.status(201).json({ success: true, message: 'Comment created successfully', comment});
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment' });
  }
}

// Controller function to update a comment
async function updateComment(req, res) {
  try {
    const { commentid } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentid);
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
    const { commentid } = req.params;

    const comment = await Comment.findByPk(commentid);
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
      const { postid } = req.params;
      console.log(postid);
      const comments = await Comment.findAll({ where: { postid } ,include: {model: User, attributes: ['username']}});
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments by postId:', error);
      res.status(500).json({ message: 'Error fetching comments by postId' });
    }
  }

module.exports = { createComment, updateComment, deleteComment,getCommentsByPostId};

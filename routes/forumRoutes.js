const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createForumPost,
  getForumPosts,
  getForumPostById,
  updateForumPost,
  deleteForumPost,
  addComment,
  deleteComment,
} = require('../controllers/forumController');

const router = express.Router();

// Route to create a forum post
router.post('/', protect, createForumPost);

// Route to get all forum posts
router.get('/', protect, getForumPosts);

// Route to get a single forum post by ID
router.get('/:_id', protect, getForumPostById);

// Route to update a forum post
router.put('/:_id', protect, updateForumPost);

// Route to delete a forum post
router.delete('/:_id', protect, deleteForumPost);

// Route to add a comment to a forum post
router.post('/:_id/comments', protect, addComment);

// Route to delete a comment from a forum post
router.delete('/:_id/comments/:commentId', protect, deleteComment);

module.exports = router;

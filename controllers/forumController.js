const Forum = require('../models/Forum');

// Create a new forum post
const createForumPost = async (req, res) => {
  try {
    const { courseId, title, content } = req.body;
    const newPost = await Forum.create({ courseId, title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all forum posts
const getForumPosts = async (req, res) => {
  try {
    const posts = await Forum.find().populate('courseId');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single forum post by ID
const getForumPostById = async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await Forum.findById(_id).populate('courseId');
    if (!post) {
      return res.status(404).json({ message: "Forum post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a forum post by ID
const updateForumPost = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Forum.findByIdAndUpdate(
      _id,
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a forum post by ID
const deleteForumPost = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedPost = await Forum.findByIdAndDelete(_id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }
    res.json({ message: "Forum post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a comment to a forum post
const addComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userId, text } = req.body; // Ensure userId is sent in the body

    const post = await Forum.findById(_id);
    if (!post) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    post.comments.push({ userId, text });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment from a forum post
const deleteComment = async (req, res) => {
  try {
    const { _id, commentId } = req.params;
    const post = await Forum.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    post.comments.id(commentId).remove();
    await post.save();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createForumPost,
  getForumPosts,
  getForumPostById,
  updateForumPost,
  deleteForumPost,
  addComment,
  deleteComment,
};

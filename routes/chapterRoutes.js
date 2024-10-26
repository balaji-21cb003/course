// chapterRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createChapter,
  getChapters,
  getChapterById,
  updateChapter,
  deleteChapter
} = require('../controllers/chapterController.js');

const router = express.Router();

// Route to create a chapter (requires JWT authentication)
router.post('/', protect, createChapter);

// Route to get all chapters (optional: filter by courseId)
router.get('/', protect, getChapters);

// Route to get a single chapter by ID
router.get('/:_id', protect, getChapterById);

// Route to update a chapter
router.put('/:_id', protect, updateChapter);

// Route to delete a chapter
router.delete('/:_id', protect, deleteChapter);

module.exports = router;

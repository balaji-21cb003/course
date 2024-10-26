// chapterController.js

const Chapter = require('../models/Chapter');

// Create a new chapter
const createChapter = async (req, res) => {
  try {
    const { title, courseId, content, order, isPublished, duration, resources } = req.body;
    const newChapter = await Chapter.create({ title, courseId, content, order, isPublished, duration, resources });
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chapters (optional: can filter by courseId)
const getChapters = async (req, res) => {
  try {
    const { courseId } = req.query;
    const query = courseId ? { courseId } : {};
    const chapters = await Chapter.find(query).populate('courseId');
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chapter by ID
const getChapterById = async (req, res) => {
  try {
    const { _id } = req.params;
    const chapter = await Chapter.findById(_id).populate('courseId');
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a chapter by ID
const updateChapter = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, content, order, isPublished, duration, resources } = req.body;
    const updatedChapter = await Chapter.findByIdAndUpdate(
      _id,
      { title, content, order, isPublished, duration, resources },
      { new: true, runValidators: true }
    );
    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.json(updatedChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chapter by ID
const deleteChapter = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedChapter = await Chapter.findByIdAndDelete(_id);
    if (!deletedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChapter,
  getChapters,
  getChapterById,
  updateChapter,
  deleteChapter
};

const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, duration, category, level, coverImage, salesVideo, faqs, status, pricing } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      duration,
      category,
      level,
      coverImage,
      salesVideo,
      faqs,
      author: req.user._id, // Use _id from the authenticated user
      status,
      pricing
    });
    
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const { _id } = req.params;
    const course = await Course.findById(_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, duration, category, level, coverImage, salesVideo, faqs, status, pricing } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        duration,
        category,
        level,
        coverImage,
        salesVideo,
        faqs,
        status,
        pricing
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(_id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};

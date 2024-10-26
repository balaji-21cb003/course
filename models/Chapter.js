// chapter.js

const mongoose = require('mongoose');

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  resources: [{
    title: String,
    url: String,
   
  }],
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
chapterSchema.index({ courseId: 1, order: 1 });

// Models
const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;

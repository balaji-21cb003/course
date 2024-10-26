// course.js

const mongoose = require("mongoose");

// Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Data Management",
        "Programming",
        "Design",
        "Business",
        "Marketing",
      ],
    },
    level: {
      type: String,
      required: true,
      enum: ["Basic", "Intermediate", "Advanced"],
    },
    coverImage: String,
    salesVideo: String,
    faqs: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    pricing: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for chapters
courseSchema.virtual("chapters", {
  ref: "Chapter",
  localField: "_id",
  foreignField: "courseId",
  options: { sort: { order: 1 } },
});

// Indexes
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ slug: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });

// Pre-save middleware to generate slug
courseSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  next();
});

// Models
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String },
    // The "author" field can be useful if you plan to allow guest posts or multiple contributors.
    author: { type: String },
    tags: [String],
    coverImage: { type: String },
    publishedDate: { type: Date },
    isPublished: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);

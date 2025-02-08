const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    technologies: [String],
    images: [String],
    videos: [String],
    projectLink: { type: String },
    date: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);

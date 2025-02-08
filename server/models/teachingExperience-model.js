const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeachingExperienceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseTitle: { type: String, required: true },
    institution: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    courseImage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeachingExperience', TeachingExperienceSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollaborationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    collaboratorName: { type: String, required: true },
    projectTitle: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    link: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Collaboration', CollaborationSchema);

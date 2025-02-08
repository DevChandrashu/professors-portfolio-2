const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResearchPaperSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    abstract: { type: String },
    authors: [String],
    publicationDate: { type: Date },
    journalOrConference: { type: String },
    pdfUrl: { type: String },
    keywords: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResearchPaper', ResearchPaperSchema);

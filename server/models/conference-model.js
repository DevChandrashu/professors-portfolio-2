const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConferenceSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    date: { type: Date },
    conferenceUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conference', ConferenceSchema);

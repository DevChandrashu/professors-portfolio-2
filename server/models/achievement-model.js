const mongoose = require('mongoose');
const { Schema } = mongoose;

const AchievementSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Achievement', AchievementSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const AwardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    awardingInstitution: { type: String },
    dateAwarded: { type: Date },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Award', AwardSchema);

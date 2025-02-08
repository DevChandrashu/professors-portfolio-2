const mongoose = require('mongoose');
const { Schema } = mongoose;

const AboutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    biography: { type: String },
    profileImage: { type: String },
    contactInfo: {
      email: { type: String },
      phone: { type: String },
      office: { type: String }
    },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', AboutSchema);

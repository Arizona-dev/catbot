const mongoose = require('mongoose');

const wouldYouRatherSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  question: {
    type: Number,
    default: 0,
  },
  answers: {
    type: Number,
    default: 0,
  },
  suggestedBy: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('wouldYouRather', wouldYouRatherSchema);
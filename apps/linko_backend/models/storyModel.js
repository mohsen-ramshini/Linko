const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  content: {
    type: {
      type: String,
      enum: ['image', 'video', 'text'],
      required: true
    },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: String,
    duration: Number,
    overlayText: [{
      text: String,
      x: Number,
      y: Number,
      fontSize: Number,
      color: String
    }]
  },

  visibility: {
    type: String,
    enum: ['public', 'friends', 'custom'],
    default: 'public'
  },
  
  allowedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  viewCount: { type: Number, default: 0 },
  
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000);
    },
    index: { expires: '24h' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', storySchema);
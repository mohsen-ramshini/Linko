const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  targetType: {
    type: String,
    enum: ['user', 'post', 'comment', 'story', 'message'],
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  reason: {
    type: String,
    enum: ['spam', 'harassment', 'hate_speech', 'violence', 'copyright', 'other'],
    required: true
  },
  
  description: String,
  
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
    default: 'pending'
  },
  
  adminNote: String,
  actionTaken: {
    type: String,
    enum: ['warning', 'post_removed', 'user_banned', 'no_action']
  }
}, {
  timestamps: true
});

reportSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
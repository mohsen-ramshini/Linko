const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  type: {
    type: String,
    enum: ['like', 'comment', 'follow', 'mention', 'reply', 'system', 'message'],
    required: true
  },
  
  data: {
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
  },
  
  title: String,
  body: String,
  
  isRead: { type: Boolean, default: false },
  readAt: Date
}, {
  timestamps: true
});

notificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
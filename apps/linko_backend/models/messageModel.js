const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  content: {
    type: {
      type: String,
      enum: ['text', 'image', 'video', 'voice', 'file', 'emoji'],
      required: true
    },
    text: String,
    mediaUrl: String,
    thumbnailUrl: String,
    duration: Number,
    fileName: String
  },

  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },

  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String
  }],

  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },

  isDeletedForSender: { type: Boolean, default: false },
  isDeletedForReceiver: { type: Boolean, default: false },
  readAt: Date
}, {
  timestamps: true
});

messageSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
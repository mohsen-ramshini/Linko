const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'متن کامنت الزامی است'],
    maxlength: [1000, 'متن کامنت بیش از حد طولانی است']
  },
  media: [{
    type: { enum: ['image', 'video'], default: 'image' },
    url: String,
    thumbnailUrl: String
  }],
  stats: {
    likesCount: { type: Number, default: 0 },
    repliesCount: { type: Number, default: 0 }
  },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});


commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ parentCommentId: 1 });

module.exports = mongoose.model('Comment', commentSchema);
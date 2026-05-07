const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  
  posts: [{
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    postedAt: Date
  }],
  
  stats: {
    totalPosts: { type: Number, default: 0 },
    recentGrowth: { type: Number, default: 0 }
  },
  
  isTrending: { type: Boolean, default: false },
  trendScore: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hashtag', hashtagSchema);
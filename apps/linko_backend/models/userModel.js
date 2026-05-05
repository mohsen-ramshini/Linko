const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    profile: {
      displayName: {
        type: String,
        required: [true, 'Display name is required'],
        trim: true,
      },
      bio: {
        type: String,
        default: '',
        maxlength: [500, 'Bio cannot be more than 500 characters'],
      },
      avatarUrl: {
        type: String,
        default: '',
      },
      coverImageUrl: {
        type: String,
        default: '',
      },
      website: {
        type: String,
        default: '',
      },
      location: {
        city: {
          type: String,
          default: '',
        },
        country: {
          type: String,
          default: '',
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
      birthdate: {
        type: Date,
        default: null,
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
      },
    },
    stats: {
      followersCount: { type: Number, default: 0 },
      followingCount: { type: Number, default: 0 },
      postsCount: { type: Number, default: 0 },
      likesCount: { type: Number, default: 0 },
      commentsCount: { type: Number, default: 0 },
    },
    privacy: {
      isPrivate: { type: Boolean, default: false },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      showLastSeen: { type: Boolean, default: true },
      allowMessagesFrom: {
        type: String,
        enum: ['everyone', 'followers', 'nobody'],
        default: 'everyone',
      },
    },
    badges: {
      type: [String],
      default: [],
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBanned: { type: Boolean, default: false },
    banReason: { type: String, default: '' },
    settings: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
      },
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        mentions: { type: Boolean, default: true },
        likes: { type: Boolean, default: true },
        comments: { type: Boolean, default: true },
        follows: { type: Boolean, default: true },
      },
    },
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      lastLoginIp: { type: String },
      loginHistory: [
        {
          ip: { type: String },
          device: { type: String },
          location: { type: String },
          loginAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model('User', userSchema);

module.exports = User;
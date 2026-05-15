const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      text: {
        type: String,
        required: [true, "متن پست الزامی است"],
        maxlength: [5000, "متن پست نمی‌تواند بیش از ۵۰۰۰ کاراکتر باشد"],
      },
    },

    media: [
      {
        type: {
          type: String,
          enum: ["image", "video", "gif", "audio"],
          required: true,
        },
        url: { type: String, required: true },
        thumbnailUrl: String,
        width: Number,
        height: Number,
        duration: Number,
        altText: String,
      },
    ],

    metadata: {
      type: {
        type: String,
        enum: ["text", "photo", "video", "poll", "link"],
        default: "text",
      },
      location: {
        name: String,
        coordinates: {
          type: [Number],
          index: "2dsphere",
        },
      },
      sharedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },

    engagement: {
      likesCount: { type: Number, default: 0 },
      commentsCount: { type: Number, default: 0 },
      savedCount: { type: Number, default: 0 },
      sharesCount: { type: Number, default: 0 },
      viewsCount: { type: Number, default: 0 },
    },

    visibility: {
      type: String,
      enum: ["public", "followers_only", "private", "direct"],
      default: "public",
    },

    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],

    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    moderation: {
      status: {
        type: String,
        enum: ["visible", "hidden", "removed"],
        default: "visible",
      },
      isReported: { type: Boolean, default: false },
      reportCount: { type: Number, default: 0 },
    },

    isPinned: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

postSchema.index({ authorId: 1, createdAt: -1 });
postSchema.index({ tags: 1, createdAt: -1 });
// postSchema.index({ engagement.likesCount: -1 });

module.exports = mongoose.model("Post", postSchema);

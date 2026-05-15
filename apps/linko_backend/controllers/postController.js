const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Report = require("../models/reportsModel");
const User = require("../models/userModel");

const postController = {
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({ isDeleted: false })
        .populate("authorId", "username profile.avatarUrl isVerified")
        .sort({ createdAt: -1 });

      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.status(200).json({
        message: "Posts found",
        count: posts.length,
        data: posts,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },

  getFeed: async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId).select("followingList");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const posts = await Post.find({
        authorId: { $in: user.followingList },
        isDeleted: false,
      })
        .populate("authorId", "username profile.avatarUrl isVerified")
        .sort({ createdAt: -1 })
        .limit(20);

      res.status(200).json({ message: "Feed retrieved", data: posts });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching feed", error: err.message });
    }
  },

  getTrendingPosts: async (req, res) => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const posts = await Post.find({
        createdAt: { $gte: twentyFourHoursAgo },
        isDeleted: false,
      })
        .sort({ "engagement.likesCount": -1 })
        .limit(10)
        .populate("authorId", "username profile.avatarUrl");

      res
        .status(200)
        .json({ message: "Trending posts retrieved", data: posts });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching trending posts", error: err.message });
    }
  },

  getExplorePosts: async (req, res) => {
    try {
      const posts = await Post.aggregate([
        { $match: { isDeleted: false, visibility: "public" } },
        { $sample: { size: 10 } },
      ]);

      res.status(200).json({ message: "Explore posts retrieved", data: posts });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching explore posts", error: err.message });
    }
  },

  getPostsByMedia: async (req, res) => {
    try {
      const { type } = req.query;

      if (!["image", "video", "gif", "audio"].includes(type)) {
        return res.status(400).json({ message: "Invalid media type" });
      }

      const posts = await Post.find({
        "media.type": type,
        isDeleted: false,
      })
        .limit(20)
        .populate("authorId", "username");

      res
        .status(200)
        .json({ message: "Posts by media retrieved", data: posts });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching posts by media", error: err.message });
    }
  },

  createPost: async (req, res) => {
    try {
      const userId = req.user._id;
      const { content, media, tags, mentions } = req.body;

      if (!content || !content.text) {
        return res.status(400).json({ message: "Post content is required" });
      }

      const newPost = new Post({
        authorId: userId,
        content: { text: content.text },
        media: media || [],
        tags: tags || [],
        mentions: mentions || [],
        metadata: {
          type: media && media.length > 0 ? media[0].type || "photo" : "text",
        },
      });

      await newPost.save();

      await User.findByIdAndUpdate(userId, { $inc: { "stats.postsCount": 1 } });

      res.status(201).json({
        message: "Post created successfully",
        data: newPost,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating post", error: err.message });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId).populate(
        "authorId",
        "username profile.avatarUrl isVerified",
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.engagement.viewsCount += 1;
      await post.save();

      res.status(200).json({ message: "Post found", data: post });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching post", error: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const userId = req.user._id;
      const { postId } = req.params;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.authorId.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this post" });
      }

      const { content, media, tags, mentions } = req.body;

      if (content) post.content.text = content.text;
      if (media) post.media = media;
      if (tags) post.tags = tags;
      if (mentions) post.mentions = mentions;

      await post.save();

      res
        .status(200)
        .json({ message: "Post updated successfully", data: post });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating post", error: err.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const userId = req.user._id;
      const { postId } = req.params;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.authorId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      post.isDeleted = true;
      post.deletedAt = new Date();
      await post.save();

      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.postsCount": -1 },
      });

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting post", error: err.message });
    }
  },

  togglePostLike: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.engagement.likesCount += 1;
      await post.save();

      res.status(200).json({
        message: "Post liked",
        likesCount: post.engagement.likesCount,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error toggling like", error: err.message });
    }
  },

  getPostLikes: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res
        .status(200)
        .json({ message: "Likes count", count: post.engagement.likesCount });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching likes", error: err.message });
    }
  },

  addComment: async (req, res) => {
    try {
      const userId = req.user._id;
      const { postId } = req.params;
      const { content, media } = req.body;

      if (!content || !content.text) {
        return res.status(400).json({ message: "Comment content is required" });
      }

      const newComment = new Comment({
        postId,
        authorId: userId,
        content: { text: content.text },
        media: media || [],
      });

      await newComment.save();

      await Post.findByIdAndUpdate(postId, {
        $inc: { "engagement.commentsCount": 1 },
      });

      res.status(201).json({ message: "Comment added", data: newComment });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error adding comment", error: err.message });
    }
  },

  getPostComments: async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ postId, isDeleted: false })
        .populate("authorId", "username profile.avatarUrl")
        .sort({ createdAt: -1 });

      res.status(200).json({ message: "Comments retrieved", data: comments });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching comments", error: err.message });
    }
  },

  repostPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.engagement.sharesCount += 1;
      await post.save();

      res.status(200).json({
        message: "Post reposted",
        sharesCount: post.engagement.sharesCount,
      });
    } catch (err) {
      res.status(500).json({ message: "Error reposting", error: err.message });
    }
  },

  removeRepost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.engagement.sharesCount > 0) {
        post.engagement.sharesCount -= 1;
        await post.save();
      }

      res.status(200).json({ message: "Repost removed" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error removing repost", error: err.message });
    }
  },

  savePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.engagement.savedCount += 1;
      await post.save();

      res.status(200).json({
        message: "Post saved",
        savedCount: post.engagement.savedCount,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving post", error: err.message });
    }
  },

  unsavePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.engagement.savedCount > 0) {
        post.engagement.savedCount -= 1;
        await post.save();
      }

      res.status(200).json({
        message: "Post unsaved",
        savedCount: post.engagement.savedCount,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error unsaving post", error: err.message });
    }
  },

  getSavedPosts: async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).select("savedPosts");

      if (!user || !user.savedPosts || user.savedPosts.length === 0) {
        return res.status(404).json({ message: "No saved posts found" });
      }

      const posts = await Post.find({
        _id: { $in: user.savedPosts },
        isDeleted: false,
      }).populate("authorId", "username profile.avatarUrl");

      res.status(200).json({ message: "Saved posts retrieved", data: posts });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching saved posts", error: err.message });
    }
  },

  reportPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.moderation.isReported = true;
      post.moderation.reportCount += 1;
      await post.save();

      await Report.create({
        reporterId: req.user._id,
        targetType: "post",
        targetId: postId,
        reason: "other",
      });

      res.status(200).json({ message: "Post reported" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error reporting post", error: err.message });
    }
  },

  getPostAnalytics: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const analytics = {
        likes: post.engagement.likesCount,
        comments: post.engagement.commentsCount,
        shares: post.engagement.sharesCount,
        views: post.engagement.viewsCount,
        saved: post.engagement.savedCount,
      };

      res.status(200).json({ message: "Analytics retrieved", data: analytics });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching analytics", error: err.message });
    }
  },
};

module.exports = postController;

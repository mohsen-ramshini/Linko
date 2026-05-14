// apps/linko_backend/controllers/userController.js

const User = require("../models/userModel");
const Post = require("../models/postModel");
const Story = require("../models/storyModel");

const sanitizeUser = (user) => {
  if (!user) return null;
  if (Array.isArray(user)) {
    return user.map((u) => sanitizeUser(u));
  }
  const userObj = user.toObject();
  delete userObj.passwordHash;
  delete userObj.security;
  return userObj;
};

const userController = {
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User found", user: sanitizeUser(user) });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user", error: error.message });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const posts = await Post.find({ authorId: req.params.id }).sort({
        createdAt: -1,
      });
      if (posts.length === 0)
        return res.status(404).json({ message: "No posts found" });
      res.status(200).json({ message: "Posts found", posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching posts", error: error.message });
    }
  },

  getUserFollowers: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({
        message: "User followers info",
        followersCount: user.stats.followersCount,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching followers", error: error.message });
    }
  },

  getUserFollowing: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({
        message: "User following info",
        followingCount: user.stats.followingCount,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching following", error: error.message });
    }
  },

  getUserStories: async (req, res) => {
    try {
      const stories = await Story.find({ authorId: req.params.id }).sort({
        createdAt: -1,
      });
      if (stories.length === 0)
        return res.status(404).json({ message: "No stories found" });
      res.status(200).json({ message: "Stories found", stories });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching stories", error: error.message });
    }
  },

  getUserStats: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Stats found", stats: user.stats });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching stats", error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const restrictedFields = [
        "passwordHash",
        "isBanned",
        "isActive",
        "stats",
      ];
      const keys = Object.keys(updateData);
      const hasRestricted = keys.some((key) => restrictedFields.includes(key));

      if (hasRestricted) {
        return res
          .status(403)
          .json({ message: "You cannot update restricted fields" });
      }

      const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User updated successfully",
        user: sanitizeUser(user),
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error updating user", error: error.message });
    }
  },

  updateUserCover: async (req, res) => {
    try {
      const { id } = req.params;
      const { coverUrl } = req.body;

      if (!coverUrl) {
        return res.status(400).json({ message: "Cover URL is required" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.profile.coverUrl = coverUrl;

      await user.save();

      res
        .status(200)
        .json({
          message: "Cover updated successfully",
          user: sanitizeUser(user),
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating cover", error: error.message });
    }
  },

  updateUserAvatar: async (req, res) => {
    try {
      const { id } = req.params;
      const { avatarUrl } = req.body;
      if (!avatarUrl)
        return res.status(400).json({ message: "Avatar URL is required" });

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.profile.avatarUrl = avatarUrl;
      await user.save();

      res
        .status(200)
        .json({ message: "Avatar updated", user: sanitizeUser(user) });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating avatar", error: error.message });
    }
  },

  updateUserSettings: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (req.body.theme) user.settings.theme = req.body.theme;
      if (req.body.language) user.settings.language = req.body.language;

      await user.save();
      res
        .status(200)
        .json({ message: "Settings updated", user: sanitizeUser(user) });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error updating settings", error: error.message });
    }
  },

  updateUserSettingsPrivacy: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const {
        isPrivate,
        showEmail,
        showPhone,
        showLastSeen,
        allowMessagesFrom,
      } = req.body;
      const validOptions = ["everyone", "followers", "nobody"];

      if (allowMessagesFrom && !validOptions.includes(allowMessagesFrom)) {
        return res
          .status(400)
          .json({ message: "Invalid allowMessagesFrom value" });
      }

      if (isPrivate !== undefined) user.privacy.isPrivate = isPrivate;
      if (showEmail !== undefined) user.privacy.showEmail = showEmail;
      if (showPhone !== undefined) user.privacy.showPhone = showPhone;
      if (showLastSeen !== undefined) user.privacy.showLastSeen = showLastSeen;
      if (allowMessagesFrom !== undefined)
        user.privacy.allowMessagesFrom = allowMessagesFrom;

      await user.save();
      res.status(200).json({
        message: "Privacy settings updated",
        user: sanitizeUser(user),
      });
    } catch (error) {
      res.status(400).json({
        message: "Error updating privacy settings",
        error: error.message,
      });
    }
  },

  getUserActivity: (req, res) => {
    res.status(200).json({ message: "Activity feature not implemented yet" });
  },

  getUserSuggestions: async (req, res) => {
    try {
      const userId = req.params.id;
      const currentUser = await User.findById(userId);
      if (!currentUser)
        return res
          .status(404)
          .json({ message: "User not found for suggestions" });

      const followers = currentUser.stats.followersList || [];
      if (followers.length === 0) {
        return res.status(200).json({
          message: "No suggestions available. Start following some people!",
          suggestions: [],
        });
      }

      const suggestedUsers = await User.find({
        _id: { $in: followers, $nin: [userId] },
      })
        .select("_id username profile.displayName profile.avatarUrl")
        .limit(10);

      const followingList = currentUser.stats.followingList || [];
      const filteredSuggestions = suggestedUsers.filter(
        (user) => !followingList.includes(user._id.toString()),
      );

      res.status(200).json({
        message: "User suggestions retrieved successfully",
        suggestions: filteredSuggestions,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error generating user suggestions",
        error: error.message,
      });
    }
  },

  searchUsers: async (req, res) => {
    try {
      const { query } = req.query;
      if (!query)
        return res.status(400).json({ message: "Query parameter is required" });

      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { "profile.displayName": { $regex: query, $options: "i" } },
        ],
      }).limit(10);

      res.status(200).json({ users: sanitizeUser(users) });
    } catch (error) {
      res.status(500).json({ message: "Search error", error: error.message });
    }
  },
};

module.exports = userController;

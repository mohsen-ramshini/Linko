const User = require("../models/userModel");
const Post = require("../models/postModel");
const Report = require("../models/reportsModel");

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const allUsers = await User.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({
        message: "Users found",
        count: allUsers.length,
        data: allUsers,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: err.message });
    }
  },

  banUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isBanned = true;
      await user.save();

      res.status(200).json({
        message: `User ${user.username} banned successfully`,
        data: user,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error banning user", error: err.message });
    }
  },
  verifyUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isVerified = true;
      await user.save();

      res.status(200).json({
        message: `User ${user.username} verified successfully`,
        data: user,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error verifying user", error: err.message });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const allPosts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      if (!allPosts || allPosts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }

      res.status(200).json({
        message: "Posts found",
        data: allPosts,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching posts", error: err.message });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        message: "Post deleted successfully",
        data: post,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting post", error: err.message });
    }
  },

  getReports: async (req, res) => {
    try {
      const allReports = await Report.find().sort({ createdAt: -1 });

      if (!allReports || allReports.length === 0) {
        return res.status(404).json({ message: "No reports found" });
      }

      res.status(200).json({
        message: "Reports found",
        data: allReports,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching reports", error: err.message });
    }
  },

  getPendingReports: async (req, res) => {
    try {
      const pendingReports = await Report.find({ status: "pending" }).sort({
        createdAt: -1,
      });

      if (!pendingReports || pendingReports.length === 0) {
        return res.status(404).json({ message: "No pending reports found" });
      }

      res.status(200).json({
        message: "Pending reports found",
        data: pendingReports,
      });
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error fetching pending reports",
          error: err.message,
        });
    }
  },

  resolveReport: async (req, res) => {
    const { id } = req.params;
    const { action, note } = req.body;

    try {
      const report = await Report.findById(id);

      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }

      report.status = "resolved";
      if (action) report.actionTaken = action;
      if (note) report.adminNote = note;

      await report.save();

      res.status(200).json({
        message: "Report resolved successfully",
        data: report,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error resolving report", error: err.message });
    }
  },

  getSystemStats: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalPosts = await Post.countDocuments();
      const totalReports = await Report.countDocuments();
      const pendingReports = await Report.countDocuments({ status: "pending" });

      res.status(200).json({
        message: "System stats retrieved",
        data: {
          totalUsers,
          totalPosts,
          totalReports,
          pendingReports,
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching stats", error: err.message });
    }
  },
  
  getDailyStats: async (req, res) => {
    try {
      // مثال ساده: تعداد پست‌های امروز
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const todayPosts = await Post.countDocuments({
        createdAt: { $gte: startOfDay },
      });

      res.status(200).json({
        message: "Daily stats retrieved",
        data: {
          postsToday: todayPosts,
        },
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching daily stats", error: err.message });
    }
  },
};

module.exports = adminController;

const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

// Create a blog (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });

    const blog = new Blog({
      title,
      content,
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      createdBy: req.user.id
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err.message });
  }
});

// Get all blogs created by logged-in user (protected)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
});

// Update a blog (only if belongs to user)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).json({ message: "Invalid blog id" });

    const blog = await Blog.findOne({ _id: blogId, createdBy: req.user.id });
    if (!blog) return res.status(404).json({ message: "Blog not found or not yours" });

    const { title, content, tags } = req.body;
    if (title !== undefined) blog.title = title;
    if (content !== undefined) blog.content = content;
    if (tags !== undefined) blog.tags = Array.isArray(tags) ? tags : [tags];

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err.message });
  }
});

// Delete a blog (only if belongs to user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) return res.status(400).json({ message: "Invalid blog id" });

    const deleted = await Blog.findOneAndDelete({ _id: blogId, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Blog not found or not yours" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
});

/**
 * Aggregation / Analytics Route
 * GET /blogs/stats
 * Returns:
 *  - totalBlogs: total count
 *  - blogsPerUser: array of { userId, name, email, count }
 *  - topTags: array of { tag, count } ordered desc
 */
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const pipeline = [
      // total count can be computed separately or with facet
      {
        $facet: {
          totalBlogs: [{ $count: "count" }],
          blogsPerUser: [
            { $group: { _id: "$createdBy", count: { $sum: 1 } } },
            {
              $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
              }
            },
            { $unwind: "$user" },
            {
              $project: {
                _id: 0,
                userId: "$user._id",
                name: "$user.name",
                email: "$user.email",
                count: 1
              }
            },
            { $sort: { count: -1 } }
          ],
          topTags: [
            { $unwind: { path: "$tags", preserveNullAndEmptyArrays: false } },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $project: { _id: 0, tag: "$_id", count: 1 } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ]
        }
      },
      {
        $project: {
          totalBlogs: { $arrayElemAt: ["$totalBlogs.count", 0] },
          blogsPerUser: 1,
          topTags: 1
        }
      }
    ];

    const result = await Blog.aggregate(pipeline);
    const stats = result[0] || { totalBlogs: 0, blogsPerUser: [], topTags: [] };

    // make sure totalBlogs is number (null -> 0)
    stats.totalBlogs = stats.totalBlogs || 0;

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error computing stats", error: err.message });
  }
});

module.exports = router;

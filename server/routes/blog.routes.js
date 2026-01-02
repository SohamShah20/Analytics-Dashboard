import express from "express";
import BlogPost from "../models/BlogPost.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Get all blog posts (tenant-scoped)
 */
router.get("/", requireAuth, async (req, res) => {
  const posts = await BlogPost.find({
    tenantId: req.user.tenantId,
  }).sort({ createdAt: -1 });

  res.json(posts);
});

/**
 * Create a blog post (admin only)
 */
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  const post = await BlogPost.create({
    tenantId: req.user.tenantId,
    title,
    content,
    authorId: req.user.userId,
  });

  res.status(201).json(post);
});

export default router;

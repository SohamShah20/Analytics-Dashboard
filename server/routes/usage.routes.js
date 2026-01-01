import express from "express";
import UsageEvent from "../models/UsageEvent.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Log a usage event
 */
router.post("/log", requireAuth, async (req, res) => {
  const { action, metadata = {} } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Action is required" });
  }

  const event = await UsageEvent.create({
    tenantId: req.user.tenantId,
    userId: req.user.userId,
    action,
    metadata,
  });

  res.status(201).json({
    message: "Usage event logged",
    eventId: event._id,
  });
});

/**
 * Get usage events (admin only, for debugging/analytics)
 */
router.get("/", requireAuth, async (req, res) => {
  const events = await UsageEvent.find({
    tenantId: req.user.tenantId,
  })
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(events);
});

export default router;

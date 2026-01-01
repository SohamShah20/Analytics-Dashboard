import express from "express";
import InsightReport from "../models/InsightReport.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const reports = await InsightReport.find({
    tenantId: req.user.tenantId,
  }).sort({ generatedAt: -1 });

  res.json(reports);
});

export default router;

import express from "express";
import Tenant from "../models/Tenant.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Create a new tenant (admin-only)
 */
router.post("/tenants", requireAuth, requireAdmin, async (req, res) => {
  const { tenantId, name, primaryColor } = req.body;

  if (!tenantId || !name) {
    return res.status(400).json({
      error: "tenantId and name are required",
    });
  }

  // Prevent duplicates
  const existing = await Tenant.findOne({ tenantId });
  if (existing) {
    return res.status(409).json({
      error: "Tenant already exists",
    });
  }

  const tenant = await Tenant.create({
    tenantId,
    name,
    primaryColor,
  });

  res.status(201).json({
    message: "Tenant created successfully",
    tenant,
  });
});

export default router;

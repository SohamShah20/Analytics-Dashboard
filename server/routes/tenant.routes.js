import express from "express";
import Tenant from "../models/Tenant.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Get current tenant info (ALL authenticated users)
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      tenantId: req.user.tenantId,
    }).select("-__v");

    if (!tenant) {
      return res.status(404).json({
        error: "Tenant not found",
      });
    }

    res.json(tenant);
  } catch (err) {
    console.error("Tenant fetch failed:", err);
    res.status(500).json({
      error: "Failed to fetch tenant info",
    });
  }
});

export default router;

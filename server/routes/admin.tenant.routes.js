import express from "express";
import Tenant from "../models/Tenant.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/**
 * Update tenant branding (admin only)
 * Updates color or logo URL metadata
 */
router.put("/tenant/branding", requireAuth, requireAdmin, async (req, res) => {
  const { primaryColor, logoUrl } = req.body;

  const tenant = await Tenant.findOneAndUpdate(
    { tenantId: req.user.tenantId },
    { primaryColor, logoUrl },
    { new: true }
  );

  res.json(tenant);
});

/**
 * Upload tenant logo (admin only)
 */
router.post(
  "/tenant/logo",
  requireAuth,
  requireAdmin,
  upload.single("logo"),
  async (req, res) => {
    const logoUrl = `/uploads/${req.file.filename}`;

    const tenant = await Tenant.findOneAndUpdate(
      { tenantId: req.user.tenantId },
      { logoUrl },
      { new: true }
    );

    res.json(tenant);
  }
);

export default router;

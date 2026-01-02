import express from "express";
import bcrypt from "bcrypt";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Create a new tenant + initial admin user
 * Platform admin only
 */
router.post("/tenants", requireAuth, requireAdmin, async (req, res) => {
    const { tenantId, tenantName, adminEmail, adminPassword } = req.body;

    if (!tenantId || !tenantName || !adminEmail || !adminPassword) {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (req.user.tenantId !== "platform") {
        return res.status(403).json({ error: "Platform admin only" });
    }


    // Prevent duplicate tenants
    const existingTenant = await Tenant.findOne({ tenantId });
    if (existingTenant) {
        return res.status(409).json({ error: "Tenant already exists" });
    }

    // Create tenant
    const tenant = await Tenant.create({
        tenantId,
        name: tenantName,
        primaryColor: "#2563eb",
    });

    // Create admin user
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const adminUser = await User.create({
        email: adminEmail,
        password: passwordHash,
        role: "admin",
        tenantId,
    });

    res.status(201).json({
        message: "Tenant created",
        tenant,
        adminUser: {
            email: adminUser.email,
            role: adminUser.role,
        },
    });
});

export default router;

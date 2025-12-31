import jwt from "jsonwebtoken";

/**
 * Verifies JWT and attaches user info to req.user
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check header presence
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Enforce tenant isolation
    if (decoded.tenantId !== req.tenantId) {
      return res.status(403).json({ error: "Tenant mismatch" });
    }

    // 4️⃣ Attach user info
    req.user = {
      userId: decoded.userId,
      tenantId: decoded.tenantId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/**
 * Allows only admin users
 */
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

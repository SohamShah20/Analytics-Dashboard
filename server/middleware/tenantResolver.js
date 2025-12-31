export const tenantResolver = (req, res, next) => {
  // 1. From header (Postman / API usage)
  const tenantFromHeader = req.headers["x-tenant-id"];

  // 2. From subdomain (future)
  const host = req.headers.host; // acme.localhost:4000
  const subdomain = host?.split(".")[0];

  const tenantId = tenantFromHeader || subdomain;

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant not identified" });
  }

  req.tenantId = tenantId;
  next();
};

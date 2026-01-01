import mongoose from "mongoose";
import dotenv from "dotenv";
import Tenant from "../models/Tenant.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Tenant.create([
  { tenantId: "acme", name: "Acme Corp" },
  { tenantId: "demo", name: "Demo Org" },
]);

console.log("Tenants seeded");
process.exit();

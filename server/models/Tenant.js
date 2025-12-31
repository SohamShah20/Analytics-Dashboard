import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    logoUrl: String,
    primaryColor: { type: String, default: "#2563eb" }
  },
  { timestamps: true }
);

export default mongoose.model("Tenant", TenantSchema);

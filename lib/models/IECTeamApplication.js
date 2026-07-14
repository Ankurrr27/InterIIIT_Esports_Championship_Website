import mongoose from "mongoose";

const IECTeamApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: { 
      type: String, 
      required: true, 
      trim: true,
      enum: ["Sponsorship", "Design", "Content", "Social", "Development", "Management"]
    },
    image_url: { type: String, required: true },
    instagram: { type: String, default: null, trim: true },
    linkedin: { type: String, default: null, trim: true },
    reason_to_join: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.models.IECTeamApplication ||
  mongoose.model("IECTeamApplication", IECTeamApplicationSchema);

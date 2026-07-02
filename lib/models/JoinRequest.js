import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"], default: "PENDING" }
}, { timestamps: true });

export default mongoose.models.JoinRequest || mongoose.model("JoinRequest", JoinRequestSchema);
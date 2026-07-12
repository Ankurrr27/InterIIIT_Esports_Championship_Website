import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema(
  {
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    inviterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inviteeEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED", "EXPIRED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Prevent multiple pending invites for the same user to the same team
InvitationSchema.index({ teamId: 1, inviteeEmail: 1 }, { unique: true, partialFilterExpression: { status: "PENDING" } });

export default mongoose.models.Invitation || mongoose.model("Invitation", InvitationSchema);

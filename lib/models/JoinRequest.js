import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user can have only one pending request to the same team
JoinRequestSchema.index(
  { userId: 1, teamId: 1 },
  { unique: true }
);

export default mongoose.models.JoinRequest ||
  mongoose.model("JoinRequest", JoinRequestSchema);
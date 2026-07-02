import Team from "@/lib/models/Team";
import User from "@/lib/models/User";
import JoinRequest from "@/lib/models/JoinRequest";

// CREATE TEAM
export const createTeam = async ({ userId, name, game }) => {
  const user = await User.findById(userId);

  if (user.teamId) throw new Error("Already in a team");

  const limits = {
    BGMI: 4,
    FREEFIRE: 4,
    VALORANT: 5
  };

  const team = await Team.create({
    name,
    game,
    leaderId: userId,
    maxPlayers: limits[game],
    members: [{ userId, role: "MEMBER" }]
  });

  user.teamId = team._id;
  user.role = "LEADER";
  await user.save();

  return team;
};

// REQUEST TO JOIN TEAM
export const requestJoinTeam = async ({ userId, teamId }) => {
  const user = await User.findById(userId);
  const team = await Team.findById(teamId);

  if (user.teamId) throw new Error("Already in a team");
  if (user.game !== team.game) throw new Error("Game mismatch");

  const existing = await JoinRequest.findOne({ userId, teamId, status: "PENDING" });
  if (existing) throw new Error("Request already sent");

  return JoinRequest.create({ userId, teamId });
};

//ACCEPT REQUEST 
export const acceptRequest = async ({ leaderId, requestId }) => {
  const req = await JoinRequest.findById(requestId);
  const team = await Team.findById(req.teamId);

  if (team.leaderId.toString() !== leaderId) {
    throw new Error("Not authorized");
  }

  if (team.members.length >= team.maxPlayers + 1) {
    throw new Error("Team full");
  }

  req.status = "ACCEPTED";
  await req.save();

  team.members.push({ userId: req.userId });
  await team.save();

  await User.findByIdAndUpdate(req.userId, {
    teamId: team._id
  });

  return team;
};

//REMOVE MEMBER
export const removeMember = async ({ leaderId, memberId }) => {
  const team = await Team.findOne({ leaderId });

  team.members = team.members.filter(
    m => m.userId.toString() !== memberId
  );

  await team.save();

  await User.findByIdAndUpdate(memberId, { teamId: null });

  return team;
};

//LEAVE TEAM
export const leaveTeam = async ({ userId }) => {
  const user = await User.findById(userId);
  const team = await Team.findById(user.teamId);

  team.members = team.members.filter(
    m => m.userId.toString() !== userId
  );

  await team.save();

  user.teamId = null;
  user.role = "PLAYER";
  await user.save();

  return true;
};

//DELETE TEAM
export const deleteTeam = async ({ leaderId }) => {
  const team = await Team.findOne({ leaderId });

  for (const m of team.members) {
    await User.findByIdAndUpdate(m.userId, {
      teamId: null,
      role: "PLAYER"
    });
  }

  await Team.deleteOne({ _id: team._id });

  return true;
};
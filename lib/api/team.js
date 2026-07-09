export async function createTeam(teamName) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    throw new Error("Please login first.");
  }

  const res = await fetch("/api/team/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user.id,
      name: teamName,
      game: user.game,
      college: user.college,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create team");
  }

  return data;
}
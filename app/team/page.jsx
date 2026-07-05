import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import TeamActions from "./components/TeamActions";

export const metadata = {
  title: "Team Management | IEC Esports",
  description: "Create, join, or manage your esports team.",
};

export default function UserTeamPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <StarsBackground className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 h-full w-full">
        <TeamActions />
      </div>
    </main>
  );
}
import TeamActions from "./components/TeamActions";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Team Management | IEC Esports",
  description: "Create, join, or manage your esports team.",
};

export default function UserTeamPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col overflow-x-hidden">
      <Navbar />
      
      {/* ── Main Content Area with Grunge Background ── */}
      <div className="relative flex-grow">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />

        {/* Diagonal splatter wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.02) 30%, transparent 50%),
              linear-gradient(-45deg, rgba(180,30,30,0.08) 0%, transparent 40%)
            `,
          }}
        />

        {/* Diagonal accent stripes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.015) 40px,
              rgba(255,255,255,0.015) 42px
            )`,
          }}
        />

        {/* Noise grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 h-full w-full">
          <TeamActions />
        </div>
      </div>

      <Footer />
    </main>
  );
}
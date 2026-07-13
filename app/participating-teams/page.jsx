"use client";

import { useState, useEffect } from "react";
import { Loader2, Users, Swords } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function ParticipatingTeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/public/teams");
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-slate-950 pt-32 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-white tracking-wide uppercase italic mb-4">
              Participating <span className="text-red-600">Teams</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Meet the formidable squads competing for glory in the championship.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center p-24">
              <Loader2 className="animate-spin text-red-600 w-12 h-12" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map(team => (
                <div key={team._id} className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 overflow-hidden backdrop-blur-sm transition-all hover:bg-white/10 hover:border-red-500/50">
                  {/* Decorative background element */}
                  <div className="absolute -right-8 -top-8 text-white/5 group-hover:text-red-500/10 transition-colors">
                    <Swords size={120} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                        {team.game}
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-wide truncate">{team.name}</h3>
                      <p className="text-slate-400 text-sm truncate">{team.college}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                        <Users size={16} className="text-red-500" />
                        <span className="font-semibold">Roster ({team.members.length}/{team.maxPlayers})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {team.members.map(member => (
                          <span 
                            key={member.userId?._id || Math.random()} 
                            className="px-2 py-1 bg-black/40 border border-white/5 rounded text-xs text-slate-300"
                          >
                            {member.userId?.name || "Player"} 
                            {member.role === "LEADER" && <span className="ml-1 text-yellow-500 font-bold">★</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {teams.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                  <Swords size={48} className="text-slate-600 mb-4" />
                  <p className="text-slate-400 text-lg">No teams have completed registration yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

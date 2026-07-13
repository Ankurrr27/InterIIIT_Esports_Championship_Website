"use client";

import { useState, useEffect } from "react";
import { Loader2, Trophy, Medal } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PublicLeaderboardPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState("BGMI");

  useEffect(() => {
    fetchLeaderboard();
  }, [game]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/teams?sort=points&game=${game}`);
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

  const getRankStyle = (index) => {
    if (index === 0) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/50";
    if (index === 1) return "text-slate-300 bg-slate-300/10 border-slate-300/50";
    if (index === 2) return "text-amber-600 bg-amber-600/10 border-amber-600/50";
    return "text-slate-500 bg-white/5 border-white/10";
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-slate-950 pt-32 pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(220,38,38,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-white tracking-wide uppercase italic mb-4">
              Current <span className="text-red-600">Standings</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Track the top performing teams in the Inter-IIIT Esports Championship.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Tabs value={game} onValueChange={setGame} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 p-1">
                <TabsTrigger value="BGMI">BGMI</TabsTrigger>
                <TabsTrigger value="VALORANT">Valorant</TabsTrigger>
                <TabsTrigger value="FREEFIRE">Free Fire</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="flex justify-center p-24">
              <Loader2 className="animate-spin text-red-600 w-12 h-12" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top 3 Podium (Optional extra flair) */}
              
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-6 py-5 font-semibold text-center w-24">Rank</th>
                      <th className="px-6 py-5 font-semibold">Team Name</th>
                      <th className="px-6 py-5 font-semibold hidden sm:table-cell">College</th>
                      <th className="px-6 py-5 font-semibold text-center">Matches</th>
                      <th className="px-6 py-5 font-semibold text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teams.map((team, index) => (
                      <tr 
                        key={team._id} 
                        className={`transition-all hover:bg-white/[0.04] ${index < 3 ? 'bg-gradient-to-r from-red-900/10 to-transparent' : ''}`}
                      >
                        <td className="px-6 py-5 text-center">
                          <div className={`mx-auto w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${getRankStyle(index)}`}>
                            {index === 0 ? <Trophy size={18} /> : index < 3 ? <Medal size={18} /> : index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-bold text-white text-lg tracking-wide">{team.name}</p>
                          <p className="text-xs text-slate-500 sm:hidden mt-1">{team.college}</p>
                        </td>
                        <td className="px-6 py-5 text-slate-400 hidden sm:table-cell">
                          {team.college}
                        </td>
                        <td className="px-6 py-5 text-center font-medium text-slate-300">
                          {team.matchesPlayed || 0}
                        </td>
                        <td className="px-6 py-5 text-right font-display text-2xl font-bold text-red-500">
                          {team.points || 0}
                        </td>
                      </tr>
                    ))}
                    {teams.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center text-slate-500">
                          No teams registered or ranked for this game yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

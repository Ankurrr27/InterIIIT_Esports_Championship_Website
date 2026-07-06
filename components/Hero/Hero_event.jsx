import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

export default function Hero_event() {
  return (
    <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden bg-black px-6 pt-20 pb-12">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[120px] pointer-events-none" />

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

      <div className="relative z-10 mx-auto max-w-5xl text-center w-full mt-6">
        
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-none border border-red-500/30 bg-red-500/10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Trophy size={16} />
          The Ultimate Showdown
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-[family-name:var(--font-display)] tracking-wider text-white uppercase leading-[0.9]">
          Inter IIIT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            Esports
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl font-medium">
          Assemble your squad and battle across India's premier IIITs for ultimate campus glory. Registrations are now open.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
          <Link
            href="/register"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-none bg-red-600 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:bg-red-700 shadow-[0_0_30px_rgba(220,38,38,0.25)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              Register Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="#about"
            className="group w-full sm:w-auto rounded-none border border-white/20 bg-black/50 backdrop-blur-md px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            Learn More
          </Link>
        </div>

      </div>

      {/* Decorative Bottom Cut */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950 z-20"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />
    </section>
  );
}
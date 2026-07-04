import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function DeveloperCard({
  image,
  name,
  role,
  quote,
  github,
  linkedin,
  website,
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-900/10">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-44 sm:h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-2.5 p-4">
        <div>
          <h3 className="text-base font-bold text-white">{name}</h3>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
            {role}
          </p>
        </div>

        <p className="line-clamp-2 text-xs leading-5 text-slate-400">
          {quote}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/5" />

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md border border-white/5 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaGithub size={14} />
            </a>
          )}

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md border border-white/5 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaLinkedin size={14} />
            </a>
          )}

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="rounded-md border border-white/5 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <Globe size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
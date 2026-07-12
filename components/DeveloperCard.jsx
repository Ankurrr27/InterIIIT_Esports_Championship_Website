import Image from "next/image";
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
    <div className="group overflow-hidden bg-white/[0.03] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.055] hover:ring-red-500/35 hover:shadow-lg hover:shadow-red-900/10">
      <div className="relative h-44 w-full overflow-hidden bg-zinc-950 sm:h-48">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-105"
        />
      </div>

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

        <div className="h-px w-full bg-white/10" />

        <div className="flex items-center gap-2">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} GitHub`}
              className="border border-white/10 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaGithub size={14} />
            </a>
          ) : null}

          {linkedin ? (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              className="border border-white/10 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaLinkedin size={14} />
            </a>
          ) : null}

          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} website`}
              className="border border-white/10 p-1.5 text-slate-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
            >
              <Globe size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

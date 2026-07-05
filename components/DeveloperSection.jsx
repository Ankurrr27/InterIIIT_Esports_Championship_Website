import DeveloperCard from "./DeveloperCard";

function DeveloperSection() {
  return (
    <section className="w-full bg-black py-12 lg:py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">Team</p>
          <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
            Developers
          </h2>
          <p className="mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-400">
            The people behind the website, focused on a clean and reliable event experience.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DeveloperCard
            image="/developers/ankur.jpg"
            name="Ankur Singh"
            role="Frontend Developer"
            quote="Building modern, responsive interfaces that create a seamless experience for every participant."
            github="https://github.com/ankur"
            linkedin="https://linkedin.com/in/ankur"
            website="https://ankur.dev"
          />

          <DeveloperCard
            image="/developers/Advik.jpeg"
            name="Advik"
            role="Frontend Developer"
            quote="Focused on crafting intuitive UI and delivering pixel-perfect user experiences."
            github="https://github.com/advik"
            linkedin="https://linkedin.com/in/advik"
            website=""
          />

          <DeveloperCard
            image="/developers/rahul.jpg"
            name="Rahul"
            role="Backend Developer"
            quote="Designing secure, scalable backend systems that keep the tournament running smoothly."
            github="https://github.com/rahul"
            linkedin="https://linkedin.com/in/rahul"
            website=""
          />
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;

import DeveloperCard from "./DeveloperCard";

function DeveloperSection() {
  return (
    <section className="w-full bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-red-500 sm:text-xs">
            Team
          </p>
          <h2 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Developers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            The people behind the website, focused on a clean and reliable event experience.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DeveloperCard
            image="/developers/ankur.jpg"
            name="Ankur"
            role="Frontend Developer"
            quote="Great software solves the real problem with the fewest moving parts."
          />

          <DeveloperCard
            image="/developers/advik.jpg"
            name="Advik"
            role="Frontend Developer"
            quote="Clear interfaces make every interaction feel faster and easier."
          />

          <DeveloperCard
            image="/developers/rahul.jpg"
            name="Rahul"
            role="Backend Developer"
            quote="Simple, scalable systems are the best foundation for a growing product."
          />
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;

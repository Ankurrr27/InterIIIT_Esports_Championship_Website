import DeveloperCard from "./DeveloperCard";

function DeveloperSection() {
  return (
    <section className="w-full py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            Meet the Developers
          </h2>

          <div className="w-28 h-1 bg-red-500 rounded-full mx-auto mt-5"></div>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            The team behind the website, dedicated to delivering a seamless
            esports experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          <DeveloperCard
            image="/developers/ankur.jpg"
            name="Ankur"
            role="Frontend Developer"
            quote="Great software is built by solving real problems, one feature at a time."
          />

          <DeveloperCard
            image="/developers/advik.jpg"
            name="Advik"
            role="Frontend Developer"
            quote="Creating intuitive interfaces that make every interaction simple and enjoyable."
          />

          <DeveloperCard
            image="/developers/rahul.jpg"
            name="Rahul"
            role="Backend Developer"
            quote="Clean code, scalable architecture, and continuous learning drive every project."
          />

        </div>

      </div>
    </section>
  );
}

export default DeveloperSection;
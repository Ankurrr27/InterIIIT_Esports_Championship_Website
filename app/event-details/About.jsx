export default function About() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold uppercase tracking-wider">
            About the Event
          </h2>

          <div className="w-28 h-1 bg-red-500 mx-auto mt-5 rounded-full"></div>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            some introduction of the event
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Battle. Compete. Conquer.
            </h3>

            <p className="text-gray-300 leading-8 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem incidunt numquam sint dicta rerum, asperiores
              deserunt quae unde laboriosam autem. Repudiandae pariatur
              accusantium natus quisquam molestiae voluptas, corporis
              necessitatibus voluptatem.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">力</span>
                <span>Multiple Esports Titles</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">力</span>
                <span>Exciting Prize Pool</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">力</span>
                <span>Professional Tournament Format</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">力</span>
                <span>Open for College Gamers</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative group">
            <img
              src="/event-slide-2.png"
              alt="Gaming Event"
              className="w-full h-[500px] object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* Glow Border */}
            <div className="absolute inset-0 rounded-3xl border border-red-500/40 shadow-[0_0_35px_rgba(239,68,68,0.25)] pointer-events-none transition-transform duration-500 group-hover:scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="bg-[#111827] text-white">

      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-16">

        <div className="bg-[#1B2435] rounded-3xl border border-gray-700 px-8 py-8">

          <p className="uppercase tracking-[0.35em] text-xs text-red-400">
            INTERIIIIT Esports
          </p>

          <div className="mt-5 flex flex-col lg:flex-row justify-between gap-8">

            <div>
              <h1 className="text-5xl font-bold">
                31+
              </h1>

              <p className="text-2xl text-gray-400 mt-2">
                Participating Colleges
              </p>
            </div>

            <div className="flex flex-wrap gap-4">

              <div className="border border-gray-700 rounded-full px-5 py-3">
                🔥 Free Fire
              </div>

              <div className="border border-gray-700 rounded-full px-5 py-3">
                🎯 BGMI
              </div>

              <div className="border border-gray-700 rounded-full px-5 py-3">
                💥 Valorant
              </div>

              <div className="border border-gray-700 rounded-full px-5 py-3">
                🏆 InterIIIT Tournament
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About */}

          <div>

            <h2 className="text-3xl font-bold">
              InterIIIIT
            </h2>

            <p className="text-gray-400 mt-5 leading-8">
              India's premier InterIIIT esports platform,
              bringing together colleges through
              competitive gaming and community.
            </p>

          </div>

          {/* Navigation */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Games</li>
              <li className="hover:text-white cursor-pointer">Developers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>

            </ul>

          </div>

          {/* Games */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Games
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Free Fire
              </li>

              <li className="hover:text-white cursor-pointer">
                BGMI
              </li>

              <li className="hover:text-white cursor-pointer">
                Valorant
              </li>

            </ul>

          </div>

          {/* Tournament */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Tournament
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>31+ Colleges</li>
              <li>National Competition</li>
              <li>Student Driven</li>
              <li>Annual Event</li>

            </ul>

          </div>

        </div>

        <hr className="border-gray-700 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

          <p>
            © 2026 InterIIIIT. All Rights Reserved.
          </p>

          <p className="mt-4 md:mt-0">
            Built with ❤️ by Ankur • Advik • Rahul
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
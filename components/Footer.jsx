function Footer() {
  return (
    <footer className="bg-[#111827] text-white">

      {/* Top Summary */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 rounded-3xl border border-white/10 bg-[#1B2435]/80 p-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-red-400 mb-3">
              INTERIIIIT Esports
            </p>
            <h2 className="text-3xl font-bold text-white">31+ Participating Colleges</h2>
            <p className="mt-3 text-sm text-slate-300 max-w-xl">
              Bringing together college gamers for competitive tournaments across major titles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <span className="rounded-full border border-gray-700 bg-white/5 px-3 py-2 text-center text-sm text-gray-300">
              🔥 Free Fire
            </span>
            <span className="rounded-full border border-gray-700 bg-white/5 px-3 py-2 text-center text-sm text-gray-300">
              🎯 BGMI
            </span>
            <span className="rounded-full border border-gray-700 bg-white/5 px-3 py-2 text-center text-sm text-gray-300">
              💥 Valorant
            </span>
            <span className="rounded-full border border-gray-700 bg-white/5 px-3 py-2 text-center text-sm text-gray-300">
              🏆 InterIIIT
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-slate-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="leading-7">
              India's premier InterIIIT esports platform connecting colleges through competitive gaming.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Site</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white">Home</li>
                <li className="hover:text-white">Events</li>
                <li className="hover:text-white">Register</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Games</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white">Free Fire</li>
                <li className="hover:text-white">BGMI</li>
                <li className="hover:text-white">Valorant</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 InterIIIIT. All Rights Reserved.</p>
          <p>Built with ❤️ by Ankur • Advik • Rahul</p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
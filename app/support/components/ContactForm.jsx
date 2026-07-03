"use client";

export default function ContactForm() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Contact Support
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Still need help? Send us a message and we'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-12">

          <form className="space-y-8">

            {/* Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-red-500"
                />
              </div>

            </div>

            {/* Category + Subject */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Category
                </label>

                <select className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-red-500">
                  <option>Registration</option>
                  <option>Team Management</option>
                  <option>Payments</option>
                  <option>Tournament Issues</option>
                  <option>Account Support</option>
                  <option>Website Bug</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-red-500"
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Tell us about your issue..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-350 hover:bg-white hover:text-black "
            >
              Submit Request
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}
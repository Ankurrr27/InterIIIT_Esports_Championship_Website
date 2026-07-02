export default function DeveloperCard({ image, name, role, quote }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]">
      
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-white">
          {name}
        </h3>

        <p className="mt-2 text-red-500 font-semibold">
          {role}
        </p>

        <p className="mt-5 text-gray-400 italic leading-7">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
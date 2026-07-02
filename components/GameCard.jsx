export default function GameCard({ image, title, description }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]">
      
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-4 text-gray-400 leading-7">
          {description}
        </p>

        <button className="mt-6 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
}
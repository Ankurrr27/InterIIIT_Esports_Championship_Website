import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <ul className="flex flex-wrap gap-6 items-center justify-center font-medium">
        <li>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/team" className="hover:text-gray-300 transition-colors">
            Team
          </Link>
        </li>
        <li>
          <Link href="/event-details" className="hover:text-gray-300 transition-colors">
            Event Details
          </Link>
        </li>
        <li>
          <Link href="/support" className="hover:text-gray-300 transition-colors">
            Support
          </Link>
        </li>
        <li>
          <Link href="/register" className="hover:text-gray-300 transition-colors">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

import Link from "next/link";
export default function Navbar() {
    return(
        <nav className="flex justify-between items-center px-8 py-4">
            <div className="font-semibold text-xl">
                Logo
            </div>
            <div className="flex items-center gap-5">
                <Link href="/event-details" className="px-4 py-2 rounded-lg">Event</Link>
                <Link href="/support" className="px-4 py-2 rounded-lg">Support</Link>
                <Link href="/team" className="px-4 py-2 rounded-lg">Team</Link>
                <Link href="/register">Register</Link>
            </div>
        </nav>
    );
}
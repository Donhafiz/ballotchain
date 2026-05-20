import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="text-center">
        <div className="text-8xl mb-6">🗳️</div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">This page does not exist in the ballot.</p>
        <Link href="/" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all">Return Home</Link>
      </div>
    </div>
  );
}
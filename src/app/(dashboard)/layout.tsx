import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-14 flex items-center px-6 sticky top-0 z-40">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-extrabold text-gray-900 dark:text-white">BallotChain</Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/dashboard/admin" className="px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">Admin</Link>
            <Link href="/dashboard/organization" className="px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">Organization</Link>
            <Link href="/voter" className="px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">Voter</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
"use client";

import Link from "next/link";

export default function OrgMyElectionsPage() {
  const elections = [{ id: "1", title: "Student Council 2026", status: "active", votes: 2847 },{ id: "2", title: "Faculty Senate", status: "draft", votes: 0 }];
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between"><div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Elections</h1><p className="text-gray-500 mt-1">{elections.length} elections</p></div><Link href="/dashboard/organization/my-elections/create" className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl">+ New Election</Link></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
        {elections.map((e) => (
          <Link key={e.id} href={"/dashboard/organization/my-elections/" + e.id} className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">🗳️</div><div><h3 className="font-semibold text-gray-900 dark:text-white">{e.title}</h3><p className="text-sm text-gray-500">{e.votes} votes</p></div></div>
            <span className={"px-3 py-1 rounded-full text-xs font-bold " + (e.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700")}>{e.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
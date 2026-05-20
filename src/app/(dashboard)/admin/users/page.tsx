"use client";

import Link from "next/link";

const users = [
  { id: "1", name: "Alice Johnson", email: "alice@edu.com", role: "admin", status: "active", lastLogin: "2026-05-19 14:32" },
  { id: "2", name: "Bob Smith", email: "bob@edu.com", role: "org_admin", status: "active", lastLogin: "2026-05-19 09:15" },
  { id: "3", name: "Carol Davis", email: "carol@edu.com", role: "voter", status: "active", lastLogin: "2026-05-18 16:45" },
  { id: "4", name: "Dan Wilson", email: "dan@edu.com", role: "observer", status: "inactive", lastLogin: "2026-04-30 11:00" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Users</h1><p className="text-gray-500 mt-1">{users.length} total users</p></div>
        <button className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">+ Add User</button>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800"><tr><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">User</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Role</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Status</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Last Login</th><th className="p-4"></th></tr></thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4"><div className="font-medium text-gray-900 dark:text-white">{u.name}</div><div className="text-sm text-gray-500">{u.email}</div></td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">{u.role}</span></td>
                <td className="p-4"><span className={"px-2 py-1 rounded-full text-xs font-bold " + (u.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500")}>{u.status}</span></td>
                <td className="p-4 text-sm text-gray-500">{u.lastLogin}</td>
                <td className="p-4"><Link href={"/dashboard/admin/users/" + u.id} className="text-blue-600 text-sm font-semibold hover:underline">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
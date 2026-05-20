"use client";

export default function OrgMembersPage() {
  const members = [{ name: "Alice Johnson", role: "Admin", email: "alice@edu.com" },{ name: "Bob Smith", role: "Manager", email: "bob@edu.com" },{ name: "Carol Davis", role: "Member", email: "carol@edu.com" }];
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Members</h1><button className="px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-xl">+ Invite</button></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
        {members.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-700">{m.name[0]}</div><div><div className="font-semibold text-gray-900 dark:text-white">{m.name}</div><div className="text-sm text-gray-500">{m.email}</div></div></div>
            <span className="text-sm text-gray-500">{m.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
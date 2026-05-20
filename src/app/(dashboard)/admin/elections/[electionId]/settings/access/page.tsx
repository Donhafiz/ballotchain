"use client";

export default function AccessCodesPage() {
  const codes = [{ code: "ELEC-2026-X7K9", status: "active", used: 45, max: 100 },{ code: "ELEC-2026-M3P2", status: "unused", used: 0, max: 50 }];
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between"><div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Access Codes</h1><p className="text-gray-500 mt-1">Manage election access codes</p></div><button className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl">+ Generate Codes</button></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full"><thead className="bg-gray-50 dark:bg-gray-800"><tr><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Code</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Status</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Used</th><th className="p-4"></th></tr></thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {codes.map((c, i) => (
              <tr key={i}><td className="p-4 font-mono text-sm font-bold text-gray-900 dark:text-white">{c.code}</td><td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{c.status}</span></td><td className="p-4 text-sm text-gray-500">{c.used}/{c.max}</td><td className="p-4"><button className="text-blue-600 text-sm font-semibold hover:underline">Revoke</button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
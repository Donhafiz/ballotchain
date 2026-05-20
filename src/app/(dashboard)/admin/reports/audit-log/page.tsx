"use client";

export default function AuditLogPage() {
  const audits = [
    { event: "User Login", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-19 14:32:15", status: "success" },
    { event: "Election Modified", user: "admin@ballotchain.com", ip: "192.168.1.1", time: "2026-05-19 14:28:42", status: "success" },
    { event: "Failed Login Attempt", user: "unknown@test.com", ip: "10.0.0.45", time: "2026-05-19 13:15:00", status: "failed" },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Audit Trail</h1><p className="text-gray-500 mt-1">Security & compliance audit logs</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800"><tr><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Event</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">User</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">IP Address</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Timestamp</th><th className="text-left p-4 text-xs font-bold text-gray-500 uppercase">Status</th></tr></thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {audits.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{a.event}</td>
                <td className="p-4 text-sm text-gray-500">{a.user}</td>
                <td className="p-4 text-sm text-gray-500 font-mono">{a.ip}</td>
                <td className="p-4 text-sm text-gray-500">{a.time}</td>
                <td className="p-4"><span className={"px-2 py-1 rounded-full text-xs font-bold " + (a.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
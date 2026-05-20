"use client";

export default function ActivityPage() {
  const logs = [
    { action: "Election Created", user: "Admin", detail: "Student Council 2026", time: "2 min ago", type: "create" },
    { action: "Vote Cast", user: "Alice Johnson", detail: "Student Council 2026", time: "5 min ago", type: "vote" },
    { action: "Voters Imported", user: "Admin", detail: "142 voters via CSV", time: "18 min ago", type: "import" },
    { action: "Settings Changed", user: "Admin", detail: "Updated security policy", time: "1 hour ago", type: "settings" },
    { action: "Failed Login", user: "Unknown", detail: "IP: 192.168.1.45", time: "2 hours ago", type: "alert" },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Activity Log</h1><p className="text-gray-500 mt-1">All system activity</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <div className={"w-2.5 h-2.5 rounded-full flex-shrink-0 " + (log.type === "create" ? "bg-blue-500" : log.type === "vote" ? "bg-green-500" : log.type === "import" ? "bg-purple-500" : "bg-red-500")} />
            <div className="flex-1"><div className="text-sm font-medium text-gray-900 dark:text-white">{log.action} by {log.user}</div><div className="text-xs text-gray-500">{log.detail}</div></div>
            <span className="text-xs text-gray-400">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
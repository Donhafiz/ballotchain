export default function APIDocsPage() {
  const endpoints = [
    { method: "POST", path: "/api/auth/register", desc: "Register a new user" },
    { method: "POST", path: "/api/auth/login", desc: "Login and get JWT token" },
    { method: "GET", path: "/api/elections", desc: "List all elections" },
    { method: "POST", path: "/api/elections", desc: "Create a new election" },
    { method: "GET", path: "/api/elections/:id", desc: "Get election details" },
    { method: "POST", path: "/api/elections/:id/candidates", desc: "Add candidate" },
    { method: "POST", path: "/api/elections/:id/votes", desc: "Submit a vote" },
    { method: "GET", path: "/api/health", desc: "Health check" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-6">
      <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">API Documentation</h1><p className="text-gray-500 mt-1">BallotChain REST API Reference</p></div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        {endpoints.map((ep, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className={"px-2 py-1 rounded text-xs font-bold text-white " + (ep.method === "GET" ? "bg-green-600" : "bg-blue-600")}>{ep.method}</span>
            <code className="text-sm text-gray-900 dark:text-white font-mono">{ep.path}</code>
            <span className="flex-1 text-sm text-gray-500">{ep.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
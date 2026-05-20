import Card from "@/components/ui/Card";

const endpoints = [
  { method: "POST", path: "/api/auth/register", desc: "Register a new user" },
  { method: "POST", path: "/api/auth/login", desc: "Login and get JWT token" },
  { method: "GET", path: "/api/elections", desc: "List all elections" },
  { method: "POST", path: "/api/elections", desc: "Create a new election" },
  { method: "POST", path: "/api/elections/:id/candidates", desc: "Add candidate" },
  { method: "POST", path: "/api/elections/:id/votes", desc: "Submit a vote" },
  { method: "GET", path: "/api/health", desc: "Health check" },
];

export default function APIDocsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Documentation</h1>
      <p className="text-gray-500">BallotChain REST API Reference</p>
      <Card padding={false}>
        <div className="divide-y divide-gray-50 dark:divide-gray-800/30">
          {endpoints.map((ep, i) => (
            <div key={i} className="flex items-center gap-4 p-5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
              <span className={"px-2 py-1 rounded-lg text-xs font-bold text-white " + (ep.method === "GET" ? "bg-emerald-600" : "bg-blue-600")}>{ep.method}</span>
              <code className="text-sm text-gray-900 dark:text-white font-mono">{ep.path}</code>
              <span className="flex-1 text-sm text-gray-500">{ep.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

export async function api(endpoint: string, options: ApiOptions = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  // Handle non-JSON responses
  const contentType = response.headers.get("content-type");
  let data: any;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || "Request failed");
  }

  return data;
}

// Auth
export const auth = {
  login: async (email: string, password: string) => {
    const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
    // Store token
    if (typeof window !== "undefined" && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },
  register: async (userData: any) => {
    const data = await api("/api/auth/register", { method: "POST", body: userData });
    if (typeof window !== "undefined" && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  isAuthenticated: () => {
    return typeof window !== "undefined" && !!localStorage.getItem("token");
  },
};

// Elections
export const elections = {
  list: () => api("/api/elections"),
  create: (data: any) => api("/api/elections", { method: "POST", body: data }),
  get: (id: string) => api(`/api/elections/${id}`),
  update: (id: string, data: any) => api(`/api/elections/${id}`, { method: "PATCH", body: data }),
  delete: (id: string) => api(`/api/elections/${id}`, { method: "DELETE" }),
};

// Votes
export const votes = {
  cast: (data: any) => api("/api/votes", { method: "POST", body: data }),
  list: (params?: { electionId?: string; voterEmail?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api(`/api/votes${query ? `?${query}` : ""}`);
  },
  verify: (receipt: string) => api(`/api/votes?receipt=${receipt}`),
};

// Health
export const health = {
  check: () => api("/api/health"),
};

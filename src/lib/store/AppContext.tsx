"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface Election {
  _id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  type: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
  totalVoters: number;
  totalVotes: number;
  createdAt: string;
}

interface Candidate {
  name: string;
  position: string;
  description: string;
  votes: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  elections: Election[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  fetchElections: () => Promise<void>;
  createElection: (data: any) => Promise<void>;
}

const AppContext = createContext<AppState>({} as AppState);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fetch elections when logged in
  useEffect(() => {
    if (token) fetchElections();
  }, [token]);

  const login = async (email: string, password: string) => {
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    await fetchElections();
  };

  const register = async (formData: any) => {
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setElections([]);
  };

  const fetchElections = async () => {
    try {
      const res = await fetch("/api/elections", {
        headers: { Authorization: "Bearer " + (token || localStorage.getItem("token")) },
      });
      if (res.ok) {
        const data = await res.json();
        setElections(data.elections || []);
      }
    } catch (err) {
      console.error("Failed to fetch elections");
    }
  };

  const createElection = async (data: any) => {
    const res = await fetch("/api/elections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token || localStorage.getItem("token")),
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    await fetchElections();
  };

  return (
    <AppContext.Provider value={{ user, token, elections, loading, error, login, register, logout, fetchElections, createElection }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
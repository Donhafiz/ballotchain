import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://ballotchain.com/api";

export const api = {
  setToken: async (token: string) => AsyncStorage.setItem("token", token),
  getToken: async () => AsyncStorage.getItem("token"),

  login: async (email: string, password: string) => {
    const res = await fetch(API_URL + "/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) await AsyncStorage.setItem("token", data.token);
    return data;
  },

  register: async (userData: any) => {
    const res = await fetch(API_URL + "/auth/register", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  getElections: async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(API_URL + "/elections", {
      headers: { Authorization: "Bearer " + token },
    });
    return res.json();
  },

  castVote: async (electionId: string, candidateId: string) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(API_URL + "/elections/" + electionId + "/votes", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify({ candidateId }),
    });
    return res.json();
  },

  getResults: async (electionId: string) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(API_URL + "/elections/" + electionId + "/results", {
      headers: { Authorization: "Bearer " + token },
    });
    return res.json();
  },
};
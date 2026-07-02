import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
    baseURL: API,
    timeout: 20000,
});

export async function fetchGithubStats() {
    const { data } = await api.get("/github/stats");
    return data;
}

export async function fetchLeetcodeStats() {
    const { data } = await api.get("/leetcode/stats");
    return data;
}

export async function fetchCodechefStats() {
    const { data } = await api.get("/codechef/stats");
    return data;
}

export async function submitContact(payload) {
    const { data } = await api.post("/contact", payload);
    return data;
}

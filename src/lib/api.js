const BASE_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

async function asJson(res) {
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}

// Users (existing)
export async function getUsers() { return asJson(await fetch(`${BASE_URL}/users/`)); }
export async function createUser({ email, full_name }) {
  return asJson(await fetch(`${BASE_URL}/users/`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, full_name }),
  }));
}

// Planner — categories
export async function getCategories() {
  return asJson(await fetch(`${BASE_URL}/categories/`));
}
export async function upsertCategory(cat) {
  return asJson(await fetch(`${BASE_URL}/categories/`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cat),
  }));
}

// Planner — transactions
export async function getTransactions(params = {}) {
  const q = new URLSearchParams(params).toString();
  return asJson(await fetch(`${BASE_URL}/transactions/${q ? `?${q}` : ""}`));
}
export async function createTransaction(tx) {
  return asJson(await fetch(`${BASE_URL}/transactions/`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx),
  }));
}
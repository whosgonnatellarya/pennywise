const API = import.meta.env.VITE_API_URL || "";

async function j(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

// Categories
export async function getCategories() {
  try { return await j("GET", "/categories/"); }
  catch { return JSON.parse(localStorage.getItem("cats") || "[]"); }
}

export async function upsertCategory(cat) {
  // Your backend uses POST /categories/ for both create and update (when id is provided)
  try {
    return await j("POST", "/categories/", {
      id: cat.id ?? null,
      name: cat.name,
      budget: cat.budget ?? 0,
    });
  } catch {
    const id = cat.id ?? Math.floor(Math.random() * 1e9);
    const saved = { ...cat, id };
    const prev = JSON.parse(localStorage.getItem("cats") || "[]");
    const next = prev.some(c => c.id === id) ? prev.map(c => c.id === id ? saved : c) : [...prev, saved];
    localStorage.setItem("cats", JSON.stringify(next));
    return saved;
  }
}

// Transactions
export async function getTransactions(category_id) {
  try {
    const qs = category_id ? `?category_id=${encodeURIComponent(category_id)}` : "";
    return await j("GET", `/transactions/${qs}`);
  } catch {
    return JSON.parse(localStorage.getItem("txs") || "[]");
  }
}

export async function createTransaction(tx) {
  try {
    return await j("POST", "/transactions/", {
      category_id: tx.category_id,
      amount: tx.amount,
      note: tx.note ?? null,
    });
  } catch {
    const optimistic = { ...tx, id: Math.floor(Math.random() * 1e9), created_at: new Date().toISOString() };
    const prev = JSON.parse(localStorage.getItem("txs") || "[]");
    localStorage.setItem("txs", JSON.stringify([optimistic, ...prev]));
    return optimistic;
  }
}
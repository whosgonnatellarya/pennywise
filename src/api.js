const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/** GET /users/ */
export async function listUsers() {
  const res = await fetch(`${API_BASE}/users/`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `listUsers failed: ${res.status}`);
  }
  return res.json();
}

/** POST /users/ */
export async function createUser(payload) {
  const res = await fetch(`${API_BASE}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    // try to surface validation errors
    const body = await res.json().catch(() => null);
    const msg = body?.detail ? JSON.stringify(body.detail) : `createUser failed: ${res.status}`;
    throw new Error(msg);
  }
  return res.json();
}
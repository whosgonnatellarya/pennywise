import React, { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers"; // keep your existing hook path
import CreateUserForm from "./CreateUserForm";

export default function UsersPanel() {
  const { data, isLoading, isError, error } = useUsers();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((u) =>
      `${u.full_name ?? ""} ${u.email}`.toLowerCase().includes(q)
    );
  }, [data, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-amber-900">Users</h2>
          <p className="text-sm text-amber-800/80">People in the system</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="pl-3 pr-10 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-label="Search users"
            />
            <button
              onClick={() => setQuery("")}
              className="absolute right-1 top-1.5 text-amber-600 text-sm"
              aria-hidden={query === ""}
            >
              Clear
            </button>
          </div>
          <div>
            <CreateUserForm />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 rounded-lg bg-amber-50 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-rose-600">Error: {error?.message ?? "Failed to load users"}</div>
      )}

      {!isLoading && !isError && (
        <>
          {filtered.length === 0 ? (
            <div className="text-amber-700">No users yet — add one with the form above.</div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((u) => (
                <article
                  key={u.id}
                  className="p-4 rounded-xl border border-amber-100 bg-white/60 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-amber-900"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(165,120,85,0.08), rgba(210,160,110,0.08))",
                      }}
                    >
                      {u.full_name ? u.full_name.split(" ").map(n => n[0]).slice(0,2).join("") : u.email[0].toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="text-amber-900 font-semibold truncate">{u.full_name ?? "(no name)"}</div>
                      <div className="text-amber-800/75 text-sm truncate">{u.email}</div>
                    </div>

                    <div className="ml-auto text-xs text-amber-700/80">ID #{u.id}</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
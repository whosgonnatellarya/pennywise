import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import Card from "../ui/card.jsx";
import { fmtCurrency } from "../lib/format.js";

export default function TransactionsTable({ transactions = [], categories = [] }) {
  const [filterCat, setFilterCat] = useState("");
  const catMap = useMemo(() => Object.fromEntries(categories.map(c => [c.id, c.name])), [categories]);
  const filtered = transactions.filter(t => !filterCat || t.category_id === Number(filterCat));
  const total = filtered.reduce((s, t) => s + (t.amount || 0), 0);

  return (
    <Card className="mt-3 overflow-hidden">
      <div className="flex items-center gap-3 p-3 border-b border-brand-200/30">
        <select className="input" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="ml-auto text-brand-700/80">
          Total: <span className="font-semibold text-brand-700">{fmtCurrency(total)}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-brand-100/70 text-left text-brand-700/80">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Note</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="odd:bg-white/70 even:bg-white/60 border-t border-brand-200/20">
                <td className="p-3">{format(new Date(t.created_at || Date.now()), "yyyy-MM-dd")}</td>
                <td className="p-3">{catMap[t.category_id] || "—"}</td>
                <td className="p-3">{t.note || ""}</td>
                <td className="p-3 font-semibold text-brand-700">{fmtCurrency(t.amount)}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td className="p-6 text-brand-700/60" colSpan="4">No transactions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

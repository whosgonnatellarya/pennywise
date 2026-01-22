import React, { useMemo } from "react";
import { fmtCurrency } from "../lib/format";

export default function Stickybar({ categories = [], transactions = [] }) {
  const { budget, spent, remaining, count } = useMemo(() => {
    const budget = categories.reduce((s, c) => s + (c.budget || 0), 0);
    const spent = transactions.reduce((s, t) => s + (t.amount || 0), 0);
    return { budget, spent, remaining: Math.max(0, budget - spent), count: transactions.length };
  }, [categories, transactions]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-5xl mb-4 px-6 md:px-12">
        <div className="rounded-xl border border-brand-200/40 bg-white/90 backdrop-blur-sm shadow-card p-3 flex items-center gap-4">
          <div className="text-brand-700/80">Transactions: <span className="font-bold text-brand-700">{count}</span></div>
          <div className="text-brand-700/80">Spent: <span className="font-bold text-brand-700">{fmtCurrency(spent)}</span></div>
          <div className="ml-auto text-brand-700/80">Remaining: <span className="font-bold text-brand-700">{fmtCurrency(remaining)}</span></div>
        </div>
      </div>
    </div>
  );
}

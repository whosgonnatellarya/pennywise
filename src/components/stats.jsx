import React, { useMemo } from "react";
import Card from "../ui/card.jsx";
import { fmtCurrency } from "../lib/format.js";
import { PiggyBank, TrendingUp, Wallet } from "lucide-react";

export default function Stats({ categories = [], transactions = [] }) {
  const { budget, spent, remaining } = useMemo(() => {
    const budget = categories.reduce((s, c) => s + (c.budget || 0), 0);
    const spent = transactions.reduce((s, t) => s + (t.amount || 0), 0);
    return { budget, spent, remaining: Math.max(0, budget - spent) };
  }, [categories, transactions]);

  const items = [
    { icon: Wallet, label: "Total Budget", value: fmtCurrency(budget) },
    { icon: TrendingUp, label: "Spent", value: fmtCurrency(spent) },
    { icon: PiggyBank, label: "Remaining", value: fmtCurrency(remaining) },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      {items.map(({ icon: Icon, label, value }) => (
        <Card key={label} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-500/15 text-brand-700 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-brand-700/70">{label}</div>
              <div className="text-xl font-bold text-brand-700">{value}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

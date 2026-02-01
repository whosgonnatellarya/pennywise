import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

import Header from "../components/header.jsx";
import Stats from "../components/stats.jsx";
import Budgetgrid from "../components/budgetgrid.jsx";
import Transactionform from "../components/transactionform.jsx";
import Transactiontable from "../components/transactiontable.jsx";
import Quickadd from "../components/quickadd.jsx";
import Stickybar from "../components/stickybar.jsx";

import { getCategories, upsertCategory, getTransactions, createTransaction } from "../lib/api.js";

export default function Planner() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [cats, txs] = await Promise.all([getCategories(), getTransactions()]);
        setCategories(cats);
        setTransactions(txs);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totals = useMemo(() => {
    const byCat = new Map();
    transactions.forEach((t) =>
      byCat.set(t.category_id, (byCat.get(t.category_id) || 0) + (t.amount || 0))
    );
    return byCat;
  }, [transactions]);

  async function handleUpsertCategory(cat) {
    const saved = await upsertCategory(cat);
    setCategories((prev) => {
      const next = prev.some((c) => c.id === saved.id)
        ? prev.map((c) => (c.id === saved.id ? saved : c))
        : [...prev, saved];
      localStorage.setItem("cats", JSON.stringify(next)); // mirror for offline
      return next;
    });
  }

  function handleDeleteCategory(id) {
    // Backend doesn't expose DELETE /categories yet — keep local removal for now.
    setCategories((prev) => {
      const next = prev.filter((c) => c.id !== id);
      localStorage.setItem("cats", JSON.stringify(next));
      return next;
    });
  }

  async function handleCreateTransaction(tx) {
    const saved = await createTransaction(tx);
    setTransactions((prev) => {
      const next = [saved, ...prev];
      localStorage.setItem("txs", JSON.stringify(next)); // mirror for offline
      return next;
    });
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Header />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        <section>
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-700">Your Planner</h1>
          <p className="mt-2 text-brand-700/80">Plan your future!</p>
        </section>

        <section className="mt-8">
          <Stats categories={categories} transactions={transactions} />
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-brand-700">Budgets</h2>
          </div>
          <Budgetgrid categories={categories} totals={totals} onSave={handleUpsertCategory} />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-brand-700">Add Transaction</h2>
          <Transactionform categories={categories} onCreate={handleCreateTransaction} />
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-brand-700">Transactions</h2>
          <Transactiontable transactions={transactions} categories={categories} />
        </section>
      </main>

      <Quickadd categories={categories} onCreate={handleCreateTransaction} />
      <Stickybar categories={categories} transactions={transactions} />
    </div>
  );
}
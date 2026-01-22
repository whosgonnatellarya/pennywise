import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Header from "../components/header";
import Stats from "../components/stats";
import budgetgrid from "../components/budgetgrid";
import transactionform from "../components/transactionform";
import transactiontable from "../components/transactiontable";
import Stickybar from "../components/stickybar.jsx";
import quickadd from "../components/quickadd.jsx";

import { getCategories, upsertCategory, getTransactions, createTransaction } from "../lib/api";

const Budgetgrid = budgetgrid;
const Transactionform = transactionform;
const Transactiontable = transactiontable;
const Quickadd = quickadd;

export default function Planner() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setError(""); setLoading(true);
    try {
      const [cats, txs] = await Promise.all([getCategories(), getTransactions()]);
      setCategories(cats);
      setTransactions(txs);
    } catch {
      setCategories(JSON.parse(localStorage.getItem("cats") || "[]"));
      setTransactions(JSON.parse(localStorage.getItem("txs") || "[]"));
      setError("Offline mode  using local data.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const totals = useMemo(() => {
    const byCat = new Map();
    transactions.forEach((t) => byCat.set(t.category_id, (byCat.get(t.category_id) || 0) + t.amount));
    return byCat;
  }, [transactions]);

  async function handleUpsertCategory(cat) {
    try {
      const saved = await upsertCategory(cat);
      setCategories((prev) => {
        const next = prev.some((c) => c.id === saved.id)
          ? prev.map((c) => (c.id === saved.id ? saved : c))
          : [...prev, saved];
        localStorage.setItem("cats", JSON.stringify(next));
        return next;
      });
    } catch {
      setCategories((prev) => {
        const id = cat.id ?? Math.floor(Math.random() * 1e9);
        const savedLocal = { ...cat, id };
        const next = prev.some((c) => c.id === id)
          ? prev.map((c) => (c.id === id ? savedLocal : c))
          : [...prev, savedLocal];
        localStorage.setItem("cats", JSON.stringify(next));
        return next;
      });
    }
  }

  async function handleCreateTransaction(tx) {
    const optimistic = { ...tx, id: Math.floor(Math.random() * 1e9), created_at: new Date().toISOString() };
    setTransactions((prev) => {
      const next = [optimistic, ...prev];
      localStorage.setItem("txs", JSON.stringify(next));
      return next;
    });
    try {
      const saved = await createTransaction(tx);
      setTransactions((prev) => {
        const next = [saved, ...prev.filter((t) => t.id !== optimistic.id)];
        localStorage.setItem("txs", JSON.stringify(next));
        return next;
      });
    } catch { /* keep optimistic in offline mode */ }
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <main className="max-w-5xl mx-auto px-6 md:px-12 pb-24">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-700">Your Planner</h1>
          <p className="mt-2 text-brand-700/80">Plan your future!</p>
          {error && <div className="mt-3 text-sm text-red-700 font-semibold">{error}</div>}
        </motion.section>

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

      {/* Quick Add above the sticky bar */}
      <Quickadd categories={categories} onCreate={handleCreateTransaction} />
      <Stickybar categories={categories} transactions={transactions} />
    </div>
  );
}


import React, { useState, useEffect } from "react";
import AmountInput from "./amountinput";
import Button from "../ui/button";
import Input from "../ui/input";
import { toast } from "react-hot-toast";

export default function TransactionForm({ categories = [], onCreate }) {
  const [amount, setAmount] = useState(0);
  const [category_id, setCategory] = useState(categories[0]?.id ?? "");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (categories.length && !category_id) setCategory(categories[0].id);
  }, [categories]);

  function submit(e) {
    e.preventDefault();
    if (!category_id) return toast.error("Pick a category");
    if (amount <= 0) return toast.error("Enter an amount");
    onCreate({ amount, category_id, note });
    toast.success("Transaction added");
    setAmount(0); setNote("");
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-center gap-3">
      <AmountInput value={amount} onChange={setAmount} />
      <select className="input bg-white/80" value={category_id} onChange={e => setCategory(Number(e.target.value))}>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <Input placeholder="Note (optional)" value={note} onChange={e => setNote(e.target.value)} className="min-w-[220px]" />
      <Button type="submit">Add</Button>
    </form>
  );
}
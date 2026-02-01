import React, { useState, useEffect } from "react";
import Modal from "../ui/modal.jsx";
import Button from "../ui/button.jsx";
import AmountInput from "./amountinput.jsx";
import Input from "../ui/input.jsx";

export default function Quickadd({ categories = [], onCreate }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category_id, setCategory] = useState(categories[0]?.id ?? "");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (categories.length && !category_id) setCategory(categories[0].id);
  }, [categories]);

  function submit(e) {
    e.preventDefault();
    if (!category_id || amount <= 0) return;
    onCreate({ amount, category_id, note });
    setAmount(0); setNote(""); setOpen(false);
  }

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40">
        <Button onClick={() => setOpen(true)}>Quick Add</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Quick Add Transaction">
        <form onSubmit={submit} className="flex flex-wrap items-center gap-3">
          <AmountInput value={amount} onChange={setAmount} />
          <select
            className="input bg-white/80"
            value={category_id}
            onChange={(e) => setCategory(Number(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <Input
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-w-[220px]"
          />
          <Button type="submit">Add</Button>
        </form>
      </Modal>
    </>
  );
}

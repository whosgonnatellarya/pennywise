import React, { useEffect, useMemo, useState } from "react";
import Card from "../ui/card.jsx";
import Input from "../ui/input.jsx";
import Button from "../ui/button.jsx";
import { fmtCurrency } from "../lib/format.js";
import { toast } from "react-hot-toast";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Categorybadge from "./categorybadge.jsx";

function Progress({ value = 0 }) {
  return (
    <div className="h-2 w-full rounded bg-brand-200/40 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-brand-400 to-brand-500" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

function useCatStyles() {
  const [styles, setStyles] = useState(() => JSON.parse(localStorage.getItem("catStyles") || "{}"));
  function save(id, patch) {
    setStyles(prev => {
      const next = { ...prev, [id]: { ...(prev[id] || {}), ...patch } };
      localStorage.setItem("catStyles", JSON.stringify(next));
      return next;
    });
  }
  return [styles, save];
}

function SortableRow({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function BudgetCard({ cat, spent = 0, onSave, style, onStyle }) {
  const [edit, setEdit] = useState(false);
  const [budget, setBudget] = useState((cat.budget ?? 0) / 100);
  const [emoji, setEmoji] = useState(style?.emoji || "");
  const [color, setColor] = useState(style?.color || "#b7791f");
  const pct = cat.budget > 0 ? Math.round((spent / cat.budget) * 100) : 0;

  useEffect(() => { setBudget((cat.budget ?? 0) / 100); }, [cat.budget]);

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <Categorybadge name={cat.name} style={{ emoji, color }} />
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setEdit(v => !v)}>{edit ? "Done" : "Edit"}</Button>
        </div>
      </div>

      <div className="mt-3">
        <Progress value={pct} />
        <div className="mt-1 text-xs text-brand-700/70">{pct}%  Spent {fmtCurrency(spent)} of {fmtCurrency(cat.budget)}</div>
      </div>

      {edit && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-brand-700/70 w-20">Budget</label>
            <Input type="number" min="0" step="0.01" value={budget} onChange={e => setBudget(Number(e.target.value))} className="w-28" />
            <Button onClick={() => {
              const cents = Math.round((Number.isFinite(budget) ? budget : 0) * 100);
              onSave({ ...cat, budget: cents });
              toast.success("Budget saved");
            }}>Save</Button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-brand-700/70 w-20">Emoji</label>
            <Input value={emoji} onChange={e => setEmoji(e.target.value)} className="w-20" />
            <label className="text-sm text-brand-700/70 w-20">Color</label>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="h-10 w-14 rounded" />
            <Button variant="secondary" onClick={() => { onStyle(cat.id, { emoji, color }); toast.success("Style updated"); }}>Apply</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function Budgetgrid({ categories = [], totals, onSave }) {
  const ids = useMemo(() => categories.map(c => c.id), [categories]);
  const [order, setOrder] = useState(() => JSON.parse(localStorage.getItem("catOrder") || "[]"));
  const [styles, saveStyle] = useCatStyles();

  // initialize order when categories change
  useEffect(() => {
    if (!order.length && ids.length) {
      setOrder(ids);
      localStorage.setItem("catOrder", JSON.stringify(ids));
    }
  }, [ids]); // eslint-disable-line

  function handleDragEnd({ active, over }) {
    if (!active?.id || !over?.id || active.id === over.id) return;
    const from = order.indexOf(active.id);
    const to = order.indexOf(over.id);
    const next = arrayMove(order, from, to);
    setOrder(next);
    localStorage.setItem("catOrder", JSON.stringify(next));
  }

  const orderedCats = (order.length ? order : ids)
    .map(id => categories.find(c => c.id === id))
    .filter(Boolean);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedCats.map(c => c.id)} strategy={verticalListSortingStrategy}>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {orderedCats.map(c => (
            <SortableRow key={c.id} id={c.id}>
              <BudgetCard
                cat={c}
                spent={totals.get(c.id) || 0}
                onSave={onSave}
                style={styles[c.id]}
                onStyle={(id, patch) => saveStyle(id, patch)}
              />
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

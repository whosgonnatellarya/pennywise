import React from "react";
import Input from "../ui/input";

export default function AmountInput({ value = 0, onChange }) {
  const display = (value ?? 0) / 100;
  function handle(e) {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const dollars = Number(raw || 0);
    onChange(Math.round(dollars * 100));
  }
  return (
    <Input
      type="text"
      value={display.toFixed(2)}
      onChange={handle}
      placeholder="0.00"
      className="w-28"
    />
  );
}
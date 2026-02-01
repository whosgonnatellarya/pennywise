import React from "react";

export default function Categorybadge({ name, style = {} }) {
  const emoji = style.emoji || "";
  const color = style.color || "#b7791f";
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
          style={{ background: `${color}22`, color }}>
      <span style={{ fontSize: 16 }}>{emoji}</span>
      <span className="font-semibold">{name}</span>
    </span>
  );
}

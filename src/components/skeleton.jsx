import React from "react";
import Card from "../ui/card.jsx";

export default function Skeleton({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((_, i) => (
        <Card key={i} className="p-4 animate-pulse">
          <div className="h-5 w-32 bg-brand-200/50 rounded mb-2" />
          <div className="h-4 w-48 bg-brand-200/40 rounded mb-4" />
          <div className="h-2 w-full bg-brand-200/40 rounded" />
        </Card>
      ))}
    </div>
  );
}

import React from "react";
import clsx from "clsx";
export default function Button({ variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm " +
    "disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500";
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    secondary: "bg-white/80 text-brand-800 border border-brand-200 hover:bg-white",
    ghost: "bg-transparent text-brand-800 hover:bg-brand-100/60",
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

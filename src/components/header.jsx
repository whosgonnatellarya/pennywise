import React from "react";
import { Sun, Moon, Wallet } from "lucide-react";

export default function Header() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return (
    <header className="px-6 md:px-12 py-4 flex items-center gap-4">
      <div className="flex items-center gap-2 text-brand-700">
        <Wallet className="w-5 h-5" />
        <span className="font-extrabold text-lg">Pennywise</span>
      </div>
      <div className="ml-auto">
        <button
          className="rounded-full px-3 py-2 text-sm bg-white/70 border border-brand-200 hover:bg-white"
          onClick={() => setDark(v => !v)}
          title="Toggle theme"
        >
          {dark ? <Sun className="w-4 h-4 inline" /> : <Moon className="w-4 h-4 inline" />} <span className="ml-1">Theme</span>
        </button>
      </div>
    </header>
  );
}